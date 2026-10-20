// Small offline prototype: reuse installed Edge/Chrome, never expose native APIs to game scripts.
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Windows.Forms;

internal static class Launcher
{
    private static string FindBrowser()
    {
        string[] roots = {
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
        };
        foreach (string relative in new[] { @"Microsoft\Edge\Application\msedge.exe", @"Google\Chrome\Application\chrome.exe" })
            foreach (string root in roots)
            {
                if (String.IsNullOrEmpty(root)) continue;
                string candidate = Path.Combine(root, relative);
                if (File.Exists(candidate)) return candidate;
            }
        return null;
    }

    [STAThread]
    private static int Main(string[] args)
    {
        string root = AppDomain.CurrentDomain.BaseDirectory;
        string entry = Path.Combine(root, "game", "index.html");
        string browser = FindBrowser();
        string[] required = {"index.html", "assets/game.js", "assets/game.css", "assets/story-classic.js", "巴啦啦K魔仙.mp3"};
        bool complete = true;
        foreach (string asset in required) complete &= File.Exists(Path.Combine(root, "game", asset));
        string uri = new Uri(entry).AbsoluteUri;
        // Check mode never starts a UI. Used by the package integration test.
        if (args.Length == 2 && args[0] == "--check")
        {
            File.WriteAllText(args[1], "assets=" + complete + "\nbrowser=" + (browser ?? "missing") + "\nuri=" + uri, Encoding.UTF8);
            return complete && browser != null ? 0 : 2;
        }
        if (!complete || browser == null)
        {
            MessageBox.Show(!complete ? "游戏文件不完整。请完整解压整个压缩包，保留 game 文件夹。" : "请先安装 Microsoft Edge 或 Google Chrome，然后重新启动游戏。", "安K模拟器", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return 2;
        }
        try
        {
            string profile = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "AnkunSimulator", "BrowserProfile");
            Directory.CreateDirectory(profile);
            Process.Start(new ProcessStartInfo {
                FileName = browser,
                Arguments = "--app=\"" + uri + "\" --window-size=1280,900 --user-data-dir=\"" + profile + "\"",
                UseShellExecute = true,
                WindowStyle = ProcessWindowStyle.Normal
            });
            return 0;
        }
        catch (Exception error)
        {
            MessageBox.Show("无法启动游戏：" + error.Message, "安K模拟器");
            return 3;
        }
    }
}
