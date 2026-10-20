// Shared rendering, state, achievements, audio and in-page reader.
const initialState = {
      mind: 72,
      money: 520,
      dignity: 65,
      day: 1,
      scene: "start",
      items: [],
      achievements: [],
      scolded: 0,
      evidence: 0,
      rebuttals: 0,
      paidTimes: 0,
      glare: 0,
      listenedRoast: 0,
      skippedQuestions: 0,
      corridorHelmet: 0,
      visitedScenes: [],
      corridorVisited: [],
      loanUsed: false,
      loanReturnScene: "corridor",
      workReturnScene: "corridor",
      radarEndingSeen: false
    };

    // State contains JSON values only; this also supports browsers without structuredClone.
    function createInitialState() {
      return JSON.parse(JSON.stringify(initialState));
    }

    let state = createInitialState();
    let permanentAchievements = [];
    let permanentEndings = [];
    const progressStorageKey = "ankun-simulator-progress-v1";

    const endingAchievementNames = {
      finalEarth: "结局：地球人",
      finalShake: "结局：摇表人",
      finalCharm: "结局：魅力走位",
      finalDayday: "结局：天道轮回",
      finalBadMind: "结局：不是地球人",
      finalBadMoney: "结局：负债退学",
      finalMirror: "结局：镜子",
      finalThroat: "结局：骚粉骑士的葬礼",
      finalGood: "结局：抬头的人",
      finalBadDignity: "结局：自动低头",
      finalWeird: "结局：表盘雷达专家"
    };
    const completionAchievementNames = globalCompletionEndingIds.map((sceneId) => endingAchievementNames[sceneId]);
    const completionAchievementAliases = {
      "结局：天道轮回": ["结局：天天好招"]
    };

    const storyEl = document.getElementById("story");
    const choicesEl = document.getElementById("choices");
    const sceneTitleEl = document.getElementById("sceneTitle");
    const dayPillEl = document.getElementById("dayPill");
    const boardTitleEl = document.getElementById("boardTitle");
    const tagsEl = document.getElementById("tags");
    const achievementsEl = document.getElementById("achievements");
    const resetBtn = document.getElementById("resetBtn");
    const clearSaveBtn = document.getElementById("clearSaveBtn");
    const loanBtn = document.getElementById("loanBtn");
    const musicBtn = document.getElementById("musicBtn");
    const bgm = document.getElementById("bgm");
    const storyImageEl = document.getElementById("storyImage");
    const photoCaptionEl = document.getElementById("photoCaption");
    const readerBackdrop = document.getElementById("readerBackdrop");
    const readerTitle = document.getElementById("readerTitle");
    const readerBody = document.getElementById("readerBody");
    const readerClose = document.getElementById("readerClose");

    const workItems = {
      easterPraise: "学长作品：《安K先生赞》",
      easterBiography: "学长作品：《安K传》",
      easterLoveLetter: "学长作品：《写给安K表白书》",
      easterAnnualPerson: "学长作品：《感动成角年度人物》",
      easterCamel: "学长作品：《沙漠骆驼·安K版》",
      easterMagic: "学长作品：《巴拉拉坤魔仙》",
      easterAlienNovel: "学长作品：《谁不是地球人》",
      easterTutorPoster: "学长作品：《安老师补课班宣传海报》"
    };

    const accidentalWorkChoices = {
      afterFirstExam: [{ label: "收作业时瞥见班级电脑旧文件", next: "easterPraise" }],
      rankAfterExam: [{ label: "群文件里突然弹出一份旧文档", next: "easterPraise" }],
      gradingPayResult: [{ label: "卷子背面夹着一份学长旧文", next: "easterPraise" }],
      gradingQuestionResult: [{ label: "同学悄悄传来一份学长旧文", next: "easterPraise" }],
      seatShowoff: [{ label: "后排课桌里露出一个手抄本", next: "easterBiography" }],
      lateCheck: [{ label: "课桌抽屉里摸到一本旧手抄本", next: "easterBiography" }],
      bookConfiscation: [{ label: "被没收的书里夹着一个手抄本", next: "easterBiography" }],
      farewellQuote: [{ label: "QQ空间刷到一条匿名投稿", next: "easterLoveLetter" }],
      graduationBoast: [{ label: "有人转发表白墙旧帖", next: "easterLoveLetter" }],
      preFinalWeek: [
        { label: "班级群旧文件里翻到颁奖词", next: "easterAnnualPerson" },
        { label: "同学又发来一个隐藏文件夹路径", next: "easterAlienNovel" }
      ],
      termDecision: [{ label: "谈话前先翻班级群网盘", next: "easterAnnualPerson" }],
      finalCorridor: [
        { label: "走廊尽头有人递来一份学长文档", next: "easterAnnualPerson" },
        { label: "机房门口贴着一个隐藏文件夹路径", next: "easterAlienNovel" }
      ],
      phonePayResult: [{ label: "新电话卡包装里夹着云盘链接", next: "easterCamel" }],
      phoneHasCardResult: [{ label: "同桌小声发来一个云盘链接", next: "easterCamel" }],
      phoneRejectResult: [{ label: "回座位后收到一个云盘音乐链接", next: "easterCamel" }],
      carUpgrade: [{ label: "粉盔电瓶车旁有人哼起改编歌", next: "easterCamel" }],
      xuScold: [{ label: "深夜刷到一条QQ空间动态", next: "easterMagic" }],
      pantsPull: [{ label: "有人转来一首改编歌", next: "easterMagic" }],
      pantsInterveneResult: [{ label: "回寝室后刷到一首改编歌", next: "easterMagic" }],
      pantsIgnoreResult: [{ label: "沉默回座位时收到一首改编歌", next: "easterMagic" }],
      longLaugh: [{ label: "有人发来一篇机房隐藏小说", next: "easterAlienNovel" }],
      longSleep: [{ label: "深夜刷到一条QQ空间动态", next: "easterMagic" }],
      office: [{ label: "办公室电脑角落露出隐藏文件夹", next: "easterAlienNovel" }],
      officeQuestion: [{ label: "下课路过机房，看见隐藏文件夹", next: "easterAlienNovel" }],
      earthWhisperResult: [{ label: "同学说机房里有篇同名小说", next: "easterAlienNovel" }],
      fee: [{ label: "旧群文件里翻到补课班宣传海报", next: "easterTutorPoster" }],
      tutorNotNormal: [{ label: "群聊里有人翻出旧宣传海报", next: "easterTutorPoster" }],
      feePayResult: [{ label: "收据夹层里露出一张旧海报", next: "easterTutorPoster" }],
      feeDelayResult: [{ label: "同学私聊发来补课班旧海报", next: "easterTutorPoster" }],
      feeRejectResult: [{ label: "回座位后看到旧群海报截图", next: "easterTutorPoster" }]
    };

    const workFilesByItem = {
      "学长作品：《安K先生赞》": "《安堃先生赞》.txt",
      "学长作品：《安K传》": "《安堃传》.txt",
      "学长作品：《写给安K表白书》": "《写给安堃表白书》.jpg",
      "学长作品：《感动城郊年度人物》": "《感动城郊年度人物》.txt",
      "学长作品：《感动成角年度人物》": "《感动城郊年度人物》.txt",
      "学长作品：《沙漠骆驼·安K版》": "《沙漠骆驼·安堃版》.docx",
      "学长作品：《巴拉拉坤魔仙》": "《巴拉拉坤魔仙》.docx",
      "学长作品：《谁不是地球人》": "《谁不是地球人》.txt",
      "学长作品：《安老师补课班宣传海报》": "《安老师补课班宣传海报》.jpg"
    };

    const workLibrary = {
      "《安堃先生赞》.txt": {
        title: "《安K先生赞》",
        type: "text",
        content: `我听说，在羊圈里生下来的小牛犊，它的行为没有不像羊的。

如今你是非常幸运的，能够进入安K老师的门下了。安老师在手腕上佩戴着金表，中间还夹杂着银表，身上穿着耐克和阿迪达斯的衣服，气派是很庄严的。他讲题目的时候，只是把答案像流水一样念出来。学生向他提问，他从来是不解答的——不是不能解答，是不想夺走学生自己领悟的机会罢了。他尤其擅长收取补课的费用，补课的时候让学生抬起头来。学生抬起头来，只看见表的光在晃动，如同沐浴在日月的辉光之中。

安老师门下的强盛，是因为他善于承接祖宗的礼节技艺并且加以变通。祖宗的旧办法，必须自己先解答了再去教别人，劳心费力，多么笨拙啊！如今安老师废掉了这个劳累形体的技艺，用念答案来代替讲解，这是节省时间；用晃表来代替板书，这是悦人眼目；用补课费来代替师道，这是明码标价。

如果继续像这样下去，那么天大的喜事必定要降临了。将来学生去考试，只记住“表晃三下选C，表晃五下选B”，人人都说遇到了名师。师道的兴盛，没有比这个更大的了！`
      },
      "《安堃传》.txt": {
        title: "《安K传》",
        type: "text",
        content: `安K者，阜阳临泉人也，号骚粉骑士。尝从事于十一中，后入成角。K常乘电瓶车，带粉兜鍪，梭与成角诸隅，虽至于班其粉盔犹不免。是故六班人称其骚粉骑士也。

K踪迹不定，而制敌于无形之中。余尝写诗赞之曰:“鬼刀走位千百度，蓦然回首，安K却在，窗角边隅处。”K甚能，自创安K拳等招式。

六班有徐名梓豪者，有八斗之才，曹子建，谢灵运皆不能匹之。K妒之，因琐事而喝之曰:“你可蠢！”遂以安K拳击之。有胡名稳龙者，素有倾国倾城之貌，K恶之，拳脚并用，推拉扯拽，喝之曰:“滚出去。”稳龙怒而不敢言也。

尝一生问题，K玩手机，并无理之。少焉，四顾，无人，谓该生曰:“我不会 。”生尴尬笑以面之。虽天地之大，谁可御K？盖K之能且皆若此。

选自《安K传》`
      },
      "《感动城郊年度人物》.txt": {
        title: "《感动成角年度人物》",
        type: "text",
        content: `问君能有几多愁？恰似安K讲课不抬头。
2020感动成角年度人物——安K（不羡金与银）

    你，虽满头青丝，却如同半百。你，虽通古晓今，却难解几何。你腕上金光闪闪，时刻警醒着自己要珍惜时间。金子代表你的心如金一般赤诚。纯金手表更是为了告诫我们，一寸光阴一寸金。你衣服上的“对号（NIKE）标志，寄承着我们考试取得满分的祝愿。多少年来，你矢志不渝，全心全意为推动成角中学的GDP做出贡献。你是成角最出色的经济学家，批评家，教育家，物理学家，生物学家，你的数学竞赛更是获得了其他班同学诸如“神奇”,“吊炸天”的一致好评。
    还记得那年夏天，你顶着酷暑，给我们补课。由于来回不方便，于是你在我们交完补课费后买了一辆新车，目的就是为了给我们多讲上几道题。你为了让我们办上移动电话卡，硬生生将学业水平测试的时间提前了两个月。虽然最后一证（身份证）难求，但是你为民着想的心，永不褪色。你挥一挥衣袖，不落下一分一毫。你晃一晃手腕，不跳过一题一问。（颁奖词）
    现在，让我们有请，2020感动成角年度人物，安K上台。


主持人:安老师，您好，欢迎欢迎。

安:（嘴一撇，拍拍话筒）哼~

主:请问您从教多少年了？

安:哼！8年了。我也教过北大的，80%都是我的功……
（这时，话筒突然没响，安K啪啪啪地拍向话筒，主持人和台下发出一片惊叹声 。导演慌忙跑到台上递给安K新话筒）
安:哼!可懂一点规矩？可知道喊报告？小学老师讲过的还让我再交给你一遍吗？
（导演尴尬地笑了笑，喊了声报告）

主:额，没什么事的话，那让我们继续吧。

安:哼~

主:请问您年收入多少？

安:（晃晃手腕）让我给你补节课，你就知道了。哼，你连块表都没有，穷逼。

主:作为一名教育家，你能谈谈你和你的学生的亲密往事吗？

安:我碰到过一个学生，他说我两年前骂过他。大家来评评理，我这哪个字是骂他的？我就讲一个“滚一边去”，他就说我骂他。可能我后面带了个娘字，他就说我骂他娘。“滚一边去，娘。”

主:作为一名批评家，你对我们敬爱的振老师与峰老师有什么评价？

安:你看那个xx振，拍马屁拍得，可让人恶心！还有那个xx峰，看似忠厚 尽干些不要脸的事。告人黑状，可要点脸？光想着往自己口袋揽钱，不从正门进，做事不怕鬼敲门。真是应了那句话“不是老人变坏了，是坏人变老了”！

主:哇⊙∀⊙！没想到安老师的语文造诣竟如此深厚。那您可以分享给我们一些有用的物理知识吗？

安:大家都知道啥叫共振效应吧？一百个人同时蹦，楼是会塌的。

主:还有一些生物知识吗？

安:我们都知道，树在黑暗里是长不高的。所以多晒晒太阳对你有好处。

主:安老师真是让我们大开眼界。那今天的对话就到这里吧。下面进入颁奖环节。有请小花童为安老师送上奖杯，让我们掌声欢迎！
 （安K怒目而视）

安:滚出去！有一个词叫“猥琐”，好了伤疤忘了疼！
（小花童一楞，随后立刻喊报告，安K接过奖杯）

安:奖金呢？

主:哎呀！最近经费紧张。你没发现校园里的石头越来越多了吗？ 而且，毕竟，校长的头发还是很贵的。

安:（突然吼起来）你可讲理，你可讲理，你咋不按套路出牌？你也不按套路出牌是吧？那管，我也不按套路出牌！

说完只见金光一闪，安K拂袖而去 。只听安K嘀咕着“ 我看你分分钟都不是地球人”
 台下一片唏嘘声。 主持人站在原地，陷入了沉思。`
      },
      "《谁不是地球人》.txt": {
        title: "《谁不是地球人》",
        type: "text",
        content: `《谁不是地球人》

“胡稳龙，你可是有病？！”

安K最近心里很烦躁。他最近刚刚接受到了一个任务，在我们当中有一个不是地球人。而判断是不是地球人只有一个方法，那就是我们地球人性格平静，淡泊金钱，工作认真。

但如果不是地球人的话，他就没有这些性格特点。所以安K只能通过这种方法来判断谁不是地球人。

到底是不是地球人呢？

难道是梓豪？安K发现梓豪有点儿不对劲，于是便把他叫了出去。“徐梓豪你可蠢，可懂一点规矩？开学以来犯了多少次错了，可够弄个处分啦？”

“你说你能考好，但这次没有考好，打脸了吧，把你的脸打得 piapia 响。”

但安K找不到充分的证据证明梓豪不是个地球人。于是，安K改变了怀疑对象。

难道是稳龙？

那晚，谁也不知道稳龙做了什么。“胡稳龙，你可是有病？！”这声音惊天动地，气壮山河，响彻云霄。

可安K终究没法断定稳龙不是地球人，于是，这件事被耽搁了一段时间。

后来到了学业水平测试，六班人有一个人带了手表。安K跑到了班里，大怒道“考前我强调了多少遍，不要带手表，你可能听懂人话，你可是地球人？我看你分分钟都不是地球人！”

安K晃了晃左手，左手腕上的那块金表，额外得耀眼。

也是，我们地球人那么多的优秀品质，都被这个带手表的家伙给败坏了。看来安K知道，谁不是地球人了。

第二天，五班人又有一个人带了手表。

所以，安K还是没法断定。

到底谁不是地球人呢？

后来的一天，当时两节数学课连堂，在上完第一节课后，超奇同学准备去问题，这时，梦飞同学拦住了他。

梦飞是同时班上的一位勤学好问的学生。可自从那一次，数学课下课，他去办公室找安K问题，从此，便再也没有找过他。

超奇问其原因，只见梦飞沉默了一会儿，便小声地回答道。

“安K在用小猿搜题。”

超奇听完，也沉默了很久。原来，谁不是地球人，并不重要。`
      },
      "《沙漠骆驼·安堃版》.docx": {
        title: "《沙漠骆驼·安K版》",
        type: "text",
        content: `安K脸大腿粗肉多
粉盔电瓶摩托
“我是指挥你们都得听我”
你可蠢也吼过
辣鸡规矩也多
男女安全距离一米间隔
上课手机不会离手
边讲边玩低头
题目不会就用小猿一搜
两架手机装兜
露出金表晃手
不值钱的东西决不将就
英魂铸就传说
骚粉骑士好似妖魔
成功人士必备的哈弗汽车
金表银表带过
名牌大衣穿过
行走在成角的一抹粉色
这一题先跳过
讲课不知对错
仍然想唤醒对数学的执着
梓豪听课拜佛
一阵推拉扯拖
大吼一声让这天惊石破
我被推拉扯拽已久
出现海市蜃楼
我仿佛看见他就站在身后
上课时要靠声吼
“可是这样的”“对否”
不知何时又站在了窗口
我起床赶紧穿鞋
跑步进班上学
谁也挡不住我看到他的急切
骚粉骑士检查作业
数学白本同步没写
推拉扯拽绝对不会停歇
英魂铸就传说
骚粉骑士好似妖魔
成功人士必备的哈弗汽车
金表银表带过
名牌大衣穿过
行走在成角的一抹粉色
这一题先跳过
讲课不知对错
仍然想唤醒对数学的执着
梓豪听课拜佛
一阵推拉扯拖
大吼一声让这天惊石破
梓豪稳龙你又犯啥错误
回眸一笑让这万物臣服
原谅我作业没写完蹲那补
上课不抬头
补课费不足
怎能被这样征服
英魂铸就传说
骚粉骑士好似妖魔
成功人士必备的哈弗汽车
金表银表带过
名牌大衣穿过
行走在成角的一抹粉色
这一题先跳过
讲课不知对错
仍然想唤醒对数学的执着
梓豪听课拜佛
一阵推拉扯拖
大吼一声让这天惊石破
苍茫大地万物
世间谁主沉浮
唯独这骚粉他挺身而出
华美瑰丽装束
金银手表无数
补课收费是条谋财之路
稳龙有点不服
那就让你舒服
请你来讲一下这一题的思路
推拉扯拽结束
美好一天谢幕
却又听到安K查寝的脚步`
      },
      "《巴拉拉坤魔仙》.docx": {
        title: "《巴拉拉坤魔仙》",
        type: "text",
        content: `从前有个徐梓豪
他班主任不得了
粉色头盔有一点骚
还有他黑色鸭舌帽
胡稳龙上课睡觉
摇摇手腕 晃一晃表
一不小心就会一团糟
一遇到难的题
先跳过这一题
办公室用小猿搜题
上课时玩手机
徐梓豪如听戏
把稳龙从位上揪起
安安安 坤魔仙
梓豪一捣蛋
就展开正义的一战
安安安 K魔仙
稳龙在呼喊
就听见响亮的耳光
这一题先放放
这题下次再讲
这一题咱不讲
这题哪位同学来讲`
      },
      "《写给安堃表白书》.jpg": {
        title: "《写给安K表白书》",
        type: "image",
        src: "《写给安堃表白书》.jpg"
      },
      "《安老师补课班宣传海报》.jpg": {
        title: "《安老师补课班宣传海报》",
        type: "image",
        src: "《安老师补课班宣传海报》.jpg"
      }
    };

    // These independent cards keep their options when a later card was seen first.
    // choose() still redirects visited destinations to the hub after applying the choice.
    const standaloneRuleScenes = new Set(["headUpRule", "distanceRule", "romanceRule"]);
    const repeatableScenes = new Set([
      "start",
      "corridor",
      "studentLoan",
      "seniorBlessing",
      "preFinalWeek",
      "finalCorridor",
      "termDecision"
    ]);

    function isRepeatableScene(sceneId) {
      return !sceneId || repeatableScenes.has(sceneId) || workItems[sceneId] || scenes[sceneId]?.ending;
    }

    function isVisitedStoryChoice(choice) {
      if (!choice.next || choice.action || isRepeatableScene(choice.next)) return false;
      return state.visitedScenes?.includes(choice.next);
    }

    const achievementDescriptions = {
      "骚粉骑士": "连续多次在走廊遭遇粉色头盔与电瓶车铃声，已经能从声音判断安老师是否接近。",
      "你可蠢": "被训斥、罚站、低头沉默的次数过多，这句口头禅已经刻进了本局记忆。",
      "这一题先放放": "旧版成就名。现在统一为“这一题先放一放”：多次遇到讲题跳过、念答案或自学补课。",
      "这一题先放一放": "多次遇到讲题跳过、念答案或自学补课，证明你见识过安老师的经典课堂节奏。",
      "金表眩晕": "收集到足够多的晃表发光经验，金表反光已经成为你的课堂预警系统。",
      "地球人之怒": "多次选择反问、质疑或依据规则回应，终于开始用地球人的方式争取规矩。",
      "小猿搜题大师": "积累了足够多的记录、录音、截图和材料，尤其掌握了小猿搜题相关线索，是检举结局的重要条件。",
      "稳龙好感": "在稳龙被针对时选择安慰或帮忙，他记住了你不是只会旁观的人。",
      "补课证据链": "收集到补课收费、录音、举报或关键证据，零散经历开始连成线。",
      "礼物举报线": "触发了礼物、补课表礼或类似举报线索，收费逻辑露出了更清楚的轮廓。",
      "装备彩蛋": "发现并记录了安老师的装备伏笔：金表、耐克、粉色头盔、电瓶车或换车线索。",
      "学长遗迹": "至少发现一件学长留下的作品，说明前人早已把荒诞写进了档案。",
      "成角考古家": "集齐大量学长作品和隐藏文本，你已经成了成角旧资料的正式考古人员。",
      "结局：地球人": "已达成地球人结局。顺利毕业，离开他的阴影，继续生活。",
      "结局：摇表人": "已达成摇表人结局。长期驯服后，差点把他的方式学成了自己的方式。",
      "结局：魅力走位": "已达成魅力走位结局。全程对着干，却没有被抓到把柄。",
      "结局：天道轮回": "已达成天道轮回结局。检举材料被核实，正义终于伸张了一点。",
      "结局：不是地球人": "已达成不是地球人结局。理智被压到极低，被迫开始怀疑自己。",
      "结局：负债退学": "已达成负债退学结局。钱包见底后，收费压力把人逼到退场。",
      "结局：镜子": "已达成镜子结局。多年后回望，明白自己不能成为那样的人。",
      "结局：骚粉骑士的葬礼": "已达成骚粉骑士的葬礼结局。荒诞终于停在一张旧课桌旁。",
      "结局：抬头的人": "已达成抬头的人结局。把孤立变成互相照应，把情绪变成证据。",
      "结局：自动低头": "已达成自动低头结局。尊严归零后，金光一闪就会提前低头。",
      "结局：表盘雷达专家": "已达成表盘雷达专家结局。至少见证 5 次晃表/反光后，你掌握了发火前摇规律。",
      "尚未解锁": "继续探索剧情、收集证据和作品，隐藏成就会在特定条件达成后出现。"
    };

    function saveProgress() {
      try {
        localStorage.setItem(progressStorageKey, JSON.stringify({
          achievements: permanentAchievements,
          endings: permanentEndings
        }));
      } catch (error) {
        console.warn("Progress could not be saved.", error);
      }
    }

    // Preserve the v1 key and all valid legacy names; discard malformed entries only.
    function normalizeSavedStrings(value) {
      return Array.isArray(value) ? [...new Set(value.filter(entry => typeof entry === "string"))] : [];
    }

    function loadProgress() {
      try {
        const saved = JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
        permanentAchievements = normalizeSavedStrings(saved && saved.achievements);
        permanentEndings = normalizeSavedStrings(saved && saved.endings);
        state.achievements = [...permanentAchievements];
      } catch (error) {
        permanentAchievements = [];
        permanentEndings = [];
      }
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function uniquePush(item) {
      if (item && !state.items.includes(item)) {
        state.items.push(item);
      }
    }

    function uniquePushTo(list, item) {
      if (item && !list.includes(item)) {
        list.push(item);
      }
    }

    function unlockAchievement(name) {
      let changed = false;
      if (!state.achievements.includes(name)) {
        state.achievements.push(name);
        changed = true;
      }
      if (!permanentAchievements.includes(name)) {
        permanentAchievements.push(name);
        changed = true;
      }
      if (changed) saveProgress();
    }

    function recordChoice(choice) {
      const label = choice.label || "";
      const item = choice.item || "";
      const scene = state.scene || "";
      const text = `${label} ${item}`;

      if (scene === "corridor") state.corridorHelmet += 1;
      if (/记录|录音|截图|材料|质询|证据|反馈/.test(text)) state.evidence += 1;
      if (/举手|拒绝|依据|为什么|您手上|地球人也需要规则/.test(text)) state.rebuttals += 1;
      if (/交|付款|办卡|补上/.test(text)) state.paidTimes += 1;
      if (/沉默|低头|骂|训话|站/.test(text)) state.scolded += 1;
      // The exam explicitly shows both watches; count observing it even for a neutral reply.
      if (/金表|手表|戴表|表盘|反光/.test(text) || scene === "monitorFee" || scene === "exam") state.glare += 1;
      if ((scene === "midtermDrama" || scene === "roast") && /认真听/.test(label)) state.listenedRoast += 1;
      if ((scene === "math" || scene === "solve") && /放|低头|自己写|自己把课补/.test(label)) state.skippedQuestions += 1;

      updateAchievements();
    }

    function updateAchievements() {
      if (state.corridorHelmet >= 3) unlockAchievement("骚粉骑士");
      if (state.scolded >= 10) unlockAchievement("你可蠢");
      if (state.skippedQuestions >= 3) unlockAchievement("这一题先放一放");
      // Five distinct observation opportunities exist with once-only story choices.
      if (state.glare >= 5) unlockAchievement("金表眩晕");
      if (state.rebuttals >= 3 && state.items.some((item) => /期末|双表|勇气|质询/.test(item))) unlockAchievement("地球人之怒");
      if (state.evidence >= 6) unlockAchievement("小猿搜题大师");
      if (state.items.some((item) => /稳龙好感/.test(item))) unlockAchievement("稳龙好感");
      if (state.items.some((item) => /证据flag|录音证据/.test(item))) unlockAchievement("补课证据链");
      if (state.items.some((item) => /举报flag/.test(item))) unlockAchievement("礼物举报线");
      if (state.items.some((item) => /彩蛋解锁/.test(item))) unlockAchievement("装备彩蛋");
      if (state.items.some((item) => /学长作品/.test(item))) unlockAchievement("学长遗迹");
      if (state.items.filter((item) => /学长作品/.test(item)).length >= 8) unlockAchievement("成角考古家");
    }

    function recordEnding(sceneId) {
      const achievementName = endingAchievementNames[sceneId];
      if (achievementName) unlockAchievement(achievementName);
      if (globalCompletionEndingIds.includes(sceneId)) {
        uniquePushTo(permanentEndings, sceneId);
        saveProgress();
      }
    }

    function hasGlobalCompletion() {
      const endingsComplete = globalCompletionEndingIds.every((sceneId) => permanentEndings.includes(sceneId));
      const hasAchievementOrAlias = (name) => {
        const names = [name, ...(completionAchievementAliases[name] || [])];
        return names.some((entry) => permanentAchievements.includes(entry) || state.achievements.includes(entry));
      };
      const achievementsComplete = completionAchievementNames.every(hasAchievementOrAlias);
      return endingsComplete || achievementsComplete;
    }

    function hasKeyEvidence() {
      return state.items.some((item) => /期末材料包|联合反馈|录音|录像|截图|证据flag|举报flag|录音证据/.test(item));
    }

    function barColor(value) {
      if (value < 25) return "var(--red)";
      if (value < 55) return "var(--gold)";
      return "var(--green)";
    }

    function updateStats() {
      const stats = [
        ["mind", 100],
        ["money", 600],
        ["dignity", 100]
      ];

      stats.forEach(([key, max]) => {
        const value = state[key];
        const bar = document.getElementById(`${key}Bar`);
        document.getElementById(`${key}Value`).textContent = value;
        bar.style.width = `${clamp(value / max * 100, 0, 100)}%`;
        bar.style.background = barColor(value);
      });

      tagsEl.innerHTML = "";
      const items = state.items.length ? state.items : ["空书包", "半截铅笔", "求生直觉"];
      items.forEach((item) => {
        const file = workFilesByItem[item];
        const tag = document.createElement(file ? "button" : "span");
        tag.className = "tag";
        tag.textContent = item;
        if (file) {
          tag.type = "button";
          tag.title = "点击查看作品/档案";
          tag.addEventListener("click", () => openReader(file));
        }
        tagsEl.appendChild(tag);
      });

      achievementsEl.innerHTML = "";
      const mergedAchievements = [...new Set([...permanentAchievements, ...state.achievements])];
      const achievements = mergedAchievements.length ? mergedAchievements : ["尚未解锁"];
      achievements.forEach((achievement) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = achievement;
        tag.title = achievementDescriptions[achievement] || "这个成就来自本局的特殊选择与收集路线。";
        tag.setAttribute("aria-label", `${achievement}：${tag.title}`);
        achievementsEl.appendChild(tag);
      });

      const canUseLoan = state.money <= 100 && !state.loanUsed && !scenes[state.scene]?.ending;
      loanBtn.disabled = !canUseLoan;
      if (state.loanUsed) {
        loanBtn.textContent = "助学贷款已使用";
      } else if (state.money <= 100) {
        loanBtn.textContent = "申请助学贷款";
      } else {
        loanBtn.textContent = "助学贷款（钱包 <= 100）";
      }
    }

    function checkEnding() {
      if (state.day >= 8 && state.mind <= 0) return "finalBadMind";
      if (state.day >= 8 && state.money <= 0 && state.loanUsed) return "finalBadMoney";
      if (state.day >= 8 && state.dignity <= 0) return "finalBadDignity";
      const hasRadar = state.items.includes("表盘雷达");
      const hasNotes = state.items.filter((item) => item.includes("记录") || item.includes("线索")).length >= 3;
      if (!state.radarEndingSeen && hasRadar && hasNotes && state.glare >= 5 && state.day >= 10 && state.dignity >= 65) return "finalWeird";
      return "";
    }

    function render(sceneId) {
      state.corridorVisited ||= [];
      state.visitedScenes ||= [];
      const forcedEnding = checkEnding();
      const nextSceneId = forcedEnding && !scenes[sceneId]?.ending ? forcedEnding : sceneId;
      const scene = scenes[nextSceneId];
      state.scene = nextSceneId;
      if (!isRepeatableScene(nextSceneId)) uniquePushTo(state.visitedScenes, nextSceneId);
      if (nextSceneId === "finalWeird") state.radarEndingSeen = true;
      if (scene.ending) recordEnding(nextSceneId);

      sceneTitleEl.textContent = scene.title;
      boardTitleEl.textContent = scene.board || "今日重点";
      dayPillEl.textContent = scene.ending ? "结局" : `第 ${state.day} 节`;
      let storyText = scene.text;
      if (nextSceneId === "studentLoan" && !state.loanUsed) {
        storyText = "钱包见底了。你可以申请一次 300 元助学贷款，继续眼前的剧情。\n\n理智 -5，尊严 -15。要不要借，由你决定。";
      }
      if (nextSceneId === "fee" && state.items.includes("贫困生")) {
        storyText += "\n\n安K扫了一眼你的申请记录，又补了一句：“贷款还不还？别到时候又说自己困难。”";
      }
      if (nextSceneId === "finalEarth" && state.loanUsed && state.money >= 100) {
        storyText += "\n\n你后来还清了那 300 块。不是还给他，是还给自己。";
      }
      storyEl.classList.toggle("letter-story", nextSceneId === "seniorBlessing");
      if (nextSceneId === "seniorBlessing") {
        storyEl.innerHTML = renderSeniorLetter();
      } else {
        storyEl.textContent = storyText;
      }
      storyImageEl.src = scene.image || "安K课堂实拍.jpg";
      storyImageEl.alt = scene.image ? scene.title : "";
      photoCaptionEl.textContent = scene.photo || "课堂实拍：安K在讲台前指向大屏，晃表反光与公式共同构成压迫感。";
      choicesEl.innerHTML = "";

      document.querySelector(".panel").classList.remove("ending-good", "ending-bad", "ending-weird");
      if (scene.ending) {
        document.querySelector(".panel").classList.add(`ending-${scene.ending}`);
      }

      const visibleChoices = scene.choices.filter((choice) => {
        const collectedWork = workItems[choice.next];
        if (collectedWork && state.items.includes(collectedWork)) return false;
        if (choice.item && /学长作品/.test(choice.item) && state.items.includes(choice.item)) return false;
        if (isVisitedStoryChoice(choice) && !standaloneRuleScenes.has(nextSceneId)) return false;
        if (nextSceneId === "corridor" && choice.next && state.corridorVisited.includes(choice.next)) return false;
        return true;
      });
      if (nextSceneId === "studentLoan" && !state.loanUsed) {
        visibleChoices.splice(0, visibleChoices.length,
          { label: "申请 300 元助学贷款", action: "applyLoan" },
          { label: "暂不申请，回走廊", next: "corridor" });
      }

      if (nextSceneId === "corridor" && !visibleChoices.length) {
        visibleChoices.push({ label: "走廊事件都经历过了，进入期末前一周", next: "preFinalWeek" });
      }
      if (nextSceneId !== "corridor" && !scene.ending && !visibleChoices.length) {
        visibleChoices.push({ label: "这段剧情已经走完，去走廊换一件事", next: "corridor" });
      }

      (accidentalWorkChoices[nextSceneId] || []).forEach((choice) => {
        const collectedWork = workItems[choice.next];
        const alreadyVisible = visibleChoices.some((visibleChoice) => visibleChoice.next === choice.next);
        if (isVisitedStoryChoice(choice)) return;
        if (collectedWork && !state.items.includes(collectedWork) && !alreadyVisible) {
          visibleChoices.push(choice);
        }
      });

      if (scene.ending && nextSceneId !== "seniorBlessing" && hasGlobalCompletion()) {
        visibleChoices.unshift({ label: "全局通关：查看学长寄语", next: "seniorBlessing" });
      }
      if (nextSceneId === "start" && hasGlobalCompletion()) {
        visibleChoices.unshift({ label: "全局通关：查看学长寄语", next: "seniorBlessing" });
      }

      visibleChoices.forEach((choice) => {

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = choice.label;
        button.addEventListener("click", () => choose(choice));
        choicesEl.appendChild(button);
      });

      updateStats();
    }

    function choose(choice) {
      if (choice.action === "applyLoan") {
        applyLoan();
        return;
      }
      if (choice.action === "reset") {
        reset();
        return;
      }

      if (choice.action === "returnFromLoan") {
        render(state.loanReturnScene || "corridor");
        return;
      }

      if (choice.action === "openFile") {
        openReader(choice.file);
        return;
      }

      if ((choice.effects?.money || 0) < 0 && state.money <= 0) {
        if (!state.loanUsed) {
          state.loanReturnScene = state.scene || "corridor";
          render("studentLoan");
        } else {
          render("finalBadMoney");
        }
        return;
      }

      if (choice.effects) {
        state.mind = clamp(state.mind + (choice.effects.mind || 0), 0, 100);
        state.money = clamp(state.money + (choice.effects.money || 0), 0, 600);
        state.dignity = clamp(state.dignity + (choice.effects.dignity || 0), 0, 100);
      }

      uniquePush(choice.item);
      recordChoice(choice);
      if (choice.next && workItems[choice.next]) {
        state.workReturnScene = state.scene || "corridor";
      }
      if (state.scene === "corridor" && choice.next && !workItems[choice.next]) {
        state.corridorVisited ||= [];
        uniquePushTo(state.corridorVisited, choice.next);
      }
      if (choice.action === "collectWorkReturn") {
        state.day += 1;
        render(state.workReturnScene || "corridor");
        return;
      }
      if (choice.action === "graduate") {
        render(graduationEnding());
        return;
      }
      state.day += 1;
      if (isVisitedStoryChoice(choice)) {
        render("corridor");
      } else {
        render(choice.next || "corridor");
      }
    }

    function applyLoan() {
      if (state.money > 100 || state.loanUsed || scenes[state.scene]?.ending) return;
      state.loanUsed = true;
      // A payment can open the pending loan page before the player borrows.
      // Preserve that interrupted scene rather than returning to the loan page itself.
      const returnScene = state.scene === "studentLoan" ? state.loanReturnScene : state.scene;
      state.loanReturnScene = returnScene && returnScene !== "studentLoan" ? returnScene : "corridor";
      state.money = clamp(state.money + 300, 0, 600);
      state.dignity = clamp(state.dignity - 15, 0, 100);
      state.mind = clamp(state.mind - 5, 0, 100);
      uniquePush("贫困生");
      render("studentLoan");
    }

    function renderSeniorLetter() {
      return `
        <article class="letter-paper">
          <h2 class="letter-title">给学弟学妹的寄语</h2>
          <p class="letter-salute">亲爱的学弟学妹：</p>
          <p class="letter-intro">如果你打开了这款游戏，走完了主要结局线——地球人、摇表人、魅力走位、天道轮回、不是地球人、负债退学、自动低头、骚粉骑士的葬礼、抬头的人——那么我想以这些作品的创作者的身份，对你说几句话。</p>

          <section class="letter-section">
            <h3>第一句：你没有错。</h3>
            <p>你上课抬头了，但你看的是黑板，不是他的表。</p>
            <p>你交补课费了，但你心里一直觉得不对。</p>
            <p>你被他骂“你可蠢”“滚你娘嘞”“你可是地球人”，你生气、委屈、觉得自己是不是真的有问题。</p>
            <p>你没有问题。有问题的是那个站在讲台上、口袋里装着你的钱、手腕上晃着金表、连一道导数题都讲不清楚的人。</p>
          </section>

          <section class="letter-section">
            <h3>第二句：你不是一个人。</h3>
            <p>这些作品，全是我一个人写的。但里面每一个细节——金表、粉盔、安K拳、酒店补课、监考费咆哮、“你可讲理”“你可是地球人”——不是我编的，是我们那一届所有人一起经历的。</p>
            <p>我不是“学长代表”。我只是那个把大家的记忆写成文字的人。</p>
            <p>你经历的，我也经历过。你不孤独，我也不孤独。</p>
          </section>

          <section class="letter-section">
            <h3>第三句：你可以不原谅，但一定要走出来。</h3>
            <p>毕业那天，我删掉了他的微信。不是我原谅了他，是我决定不再让他占我的内存。</p>
            <p>你以后会考上大学、读研、工作、结婚、生子。你会遇见真正的老师——那些备课到深夜、批作业到凌晨、会因为你考好了而发自内心高兴的人。</p>
            <p>你会发现，安K那样的东西，不配叫“老师”。你会发现，你当年受过的那些委屈，不是你的错，也不是你的命。</p>
            <p>你可以恨他。但不要让他定义你的一生。</p>
          </section>

          <section class="letter-section">
            <h3>第四句：如果你有能力，不要让下一个“安K”继续站在讲台上。</h3>
            <p>我知道，举报很难。家长会说“多一事不如少一事”，学校会保他，教育局未必管，甚至你自己都会犹豫——“我真的要毁掉一个人的工作吗？”</p>
            <p>但我想告诉你：毁掉教育的不是举报的人，是那些站在讲台上却不配的人。</p>
            <p>如果你有能力、有证据、有勇气，去做你觉得对的事。如果你没有，也没关系。保护好自己，先活下去。</p>
            <p>但请记住：沉默是一种选择，不是一种义务。</p>
          </section>

          <section class="letter-section">
            <h3>第五句：我们赢了。</h3>
            <p>不是我们举报了他、打败了他。是我们没有变成他。</p>
            <p>我们没有变成那种收钱不办事、念答案不讲课、打学生不脸红的人。</p>
            <p>我们走过那条走廊，推开那扇门，坐在那个50多人的酒店标准间里，熬过了那个暑假。我们活着出来了。我们考上了大学。我们读了研。</p>
            <p>我们还在写段子、写小说、做游戏，把他的名字钉在每一个能看见的地方。</p>
            <p>他还在晃他的表，但我们再也不会抬头了。</p>
          </section>

          <div class="letter-signature">
            <p>你的学长</p>
            <p>若朝</p>
          </div>
        </article>
      `;
    }

    let readerReturnFocus = null;
    function openReader(file) {
      const work = workLibrary[file];
      if (!work) return;
      readerReturnFocus = document.activeElement;
      readerTitle.textContent = work.title;
      readerBody.innerHTML = "";
      if (work.type === "image") {
        const img = document.createElement("img");
        img.src = work.src;
        img.alt = work.title;
        readerBody.appendChild(img);
      } else {
        const pre = document.createElement("pre");
        pre.className = "reader-text";
        pre.textContent = work.content;
        readerBody.appendChild(pre);
      }
      readerBackdrop.classList.add("is-open");
      readerBackdrop.setAttribute("aria-hidden", "false");
      readerClose.focus();
    }

    function closeReader() {
      readerBackdrop.classList.remove("is-open");
      // Move focus out before hiding the dialog from assistive technology.
      if (readerReturnFocus && readerReturnFocus.isConnected) readerReturnFocus.focus();
      readerBackdrop.setAttribute("aria-hidden", "true");
      readerBody.innerHTML = "";
    }

    function reset() {
      permanentAchievements = [...new Set([...permanentAchievements, ...state.achievements])];
      saveProgress();
      state = createInitialState();
      state.achievements = [...permanentAchievements];
      render("start");
    }

    function clearSave() {
      const confirmed = window.confirm("确定要清空所有存档吗？已解锁的结局、隐藏成就和通关寄语进度都会重置。");
      if (!confirmed) return;
      permanentAchievements = [];
      permanentEndings = [];
      try {
        localStorage.removeItem(progressStorageKey);
      } catch (error) {
        console.warn("Progress could not be cleared.", error);
      }
      state = createInitialState();
      render("start");
    }

    musicBtn.addEventListener("click", async () => {
      if (bgm.paused) {
        try {
          bgm.volume = 0.45;
          await bgm.play();
          musicBtn.textContent = "暂停 BGM";
        } catch (error) {
          musicBtn.textContent = "点击后再试一次";
        }
      } else {
        bgm.pause();
        musicBtn.textContent = "播放 BGM";
      }
    });

    resetBtn.addEventListener("click", reset);
    clearSaveBtn.addEventListener("click", clearSave);
    loanBtn.addEventListener("click", applyLoan);
    readerClose.addEventListener("click", closeReader);
    readerBackdrop.addEventListener("click", (event) => {
      if (event.target === readerBackdrop) closeReader();
    });
    document.addEventListener("keydown", (event) => {
      if (!readerBackdrop.classList.contains("is-open")) return;
      if (event.key === "Escape") { event.preventDefault(); closeReader(); }
      // The scrollable body is focusable so keyboard users can read long works.
      if (event.key === "Tab") {
        event.preventDefault();
        (document.activeElement === readerClose ? readerBody : readerClose).focus();
      }
    });
    loadProgress();
    render("start");
