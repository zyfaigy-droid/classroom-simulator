// Story with user-authorized short-event update; preserved ending rules for 安堃模拟器.html; do not merge variants implicitly.
const scenes = {
      start: {
        title: "游戏介绍",
        board: "转校生档案",
        text: "你是一名转校生。\n\n这一天，你踏入成角中学高三（5）班的教室。\n\n讲台上站着一名中年男子：手戴金表，身穿耐克，脚踩阿迪。后来你才知道，他不止这一块表，而是三块表轮着戴：两金一银，一天一换。\n\n后来你打听到，他就是成角中学传奇数学竞赛讲师——安K。\n\n在这个班里，等待你的会是什么呢？",
        photo: "游戏介绍：转校生第一次踏入高三（5）班。",
        choices: [
          { label: "正式进入游戏", next: "firstClass", effects: { mind: 2 } }
        ]
      },
      firstClass: {
        "title": "开学第一课",
        "board": "规矩先讲清楚",
        "text": "安K往讲台前一站：“你们可以叫我K哥。”\n\n他抬起手腕。你还没看清表盘，规矩已经开始了。\n\n前排小声提醒：两金一银，今天轮到金的。",
        "photo": "K哥登场，先讲规矩。",
        "choices": [
          {
            "label": "认真点头，并记下所有规矩",
            "next": "headUpRule",
            "effects": {
              "dignity": 8,
              "mind": -8
            },
            "item": "K哥规矩本"
          },
          {
            "label": "低头偷偷做数学题",
            "next": "math",
            "effects": {
              "dignity": -8,
              "mind": 3
            },
            "item": "半页草稿"
          },
          {
            "label": "观察晃表发光的规律",
            "next": "watchStudy",
            "effects": {
              "mind": 2
            },
            "item": "反光角度笔记"
          },
          {
            "label": "举手问：为什么不能问为什么",
            "next": "office",
            "effects": {
              "dignity": -25,
              "mind": -18
            }
          }
        ]
      },
      afterFirstExam: {
        title: "第一次月考后",
        board: "态度决定成绩",
        text: "第一次月考后，安K拿着成绩单念分数。\n\n他重点表扬了交补课费的同学，又看了看几个没交钱的人：“有些同学成绩不理想，不是能力问题，是态度有问题。”\n\n你听懂了他的暗示，也看见几位同学低下了头。",
        photo: "第一次月考后：成绩单被念成了补课动员稿。",
        choices: [
          { label: "低头沉默，先别惹事", next: "midtermDrama", effects: { mind: -5, dignity: -5 } },
          { label: "记录成绩评价和补课暗示", next: "midtermDrama", effects: { mind: 3, dignity: 6 }, item: "成绩评价记录" },
          { label: "下一节数学课继续看他讲题", next: "math", effects: { mind: 1 } },
          { label: "翻班级电脑里的旧文件", next: "easterPraise" },
          { label: "小声说：这和交钱有什么关系", next: "caught", effects: { mind: -15, dignity: -18 } }
        ]
      },
      midtermDrama: {
        title: "期中大戏",
        board: "振老师与峰老师",
        text: "期中前后，安K花了一整节数学课骂振老师和峰老师。\n\n“你看那个xx振，拍马屁拍的，可让人恶心！”他说着说着又转向另一个人，“还有那个xx峰，看似忠厚尽干些不要脸的事，告人黑状，可要点脸！真是应了那句老话，不是老人变坏了，是坏人变老了！”\n\n黑板上的题停在第一行。你翻着练习册，面临一个很现实的选择：听，还是不听？",
        photo: "期中大戏：数学课临时变成锐评专场。",
        choices: [
          { label: "认真听，并记下原话", next: "fee", effects: { dignity: 8, mind: -6 }, item: "锐评原话记录" },
          { label: "偷偷做题，自己把课补回来", next: "fee", effects: { mind: 5, dignity: -6 }, item: "自学草稿" },
          { label: "举手说：老师，这节是数学课", next: "office", effects: { dignity: -30, mind: -20 } }
        ]
      },
      math: {
        "title": "数学课：导数与沉默",
        "board": "导数题：下次再讲",
        "text": "安K抄了一道导数题：“你们先自己做。”\n\n他念了两句：“先求导，导数大于零就增，小于零就减。”讲到参数分类，粉笔却停住。手机上的小猿搜题还亮着。\n\n“这一题下次再讲。”他把粉笔一放。最关键的一步依然空着。",
        "choices": [
          {
            "label": "举手：我来试试",
            "next": "solve",
            "effects": {
              "mind": 10,
              "dignity": 5
            }
          },
          {
            "label": "低头把题自己写完",
            "next": "mathIgnoreResult",
            "effects": {
              "mind": 0,
              "dignity": 0
            }
          },
          {
            "label": "小声说：小猿也没搜出来？",
            "next": "mathWhisperResult",
            "effects": {
              "mind": -10,
              "dignity": -10
            }
          }
        ]
      },
      mathIgnoreResult: {
        "title": "低头继续看书",
        "board": "你是不是对我的教学有意见",
        "text": "你低头把题写完了。\n\n下课后，安K在后门叫住你：“你是不是对我的教学有意见？”\n\n题做对了，抬头做错了。",
        "photo": "低头看书：题做完了，但人被盯上了。",
        "choices": [
          {
            "label": "回到走廊",
            "next": "corridor"
          }
        ]
      },
      mathWhisperResult: {
        "title": "小猿也没搜出来？",
        "board": "一起罚站",
        "text": "你小声说：“小猿也没搜出来？”同桌没忍住笑了一下。\n\n安K转身：“你们两个站起来。会做你们上来讲。”\n\n你们一起罚站。那道题还是没讲。",
        "photo": "偷偷吐槽：笑声很小，后果很大。",
        "choices": [
          {
            "label": "回到走廊",
            "next": "corridor"
          }
        ]
      },
      watchStudy: {
        title: "晃表光学实验",
        board: "入射角等于反射角",
        text: "你用草稿纸画出晃表反光轨迹，发现每当安K准备发火，他都会先抬起手腕晃表。金光一闪，怒气随后抵达。\n\n你顺手把样本分成三类：一号金表偏黄，二号金表更亮，银表反光冷一点。三块表轮流登场，两金一银，一天一换，像某种不写在课表上的排班。\n\n这不是超能力，只是一个提前 0.8 秒的预警系统。",
        choices: [
          { label: "把它命名为“表盘雷达”", next: "afterFirstExam", effects: { mind: 6 }, item: "表盘雷达" },
          { label: "继续盯着看，眼睛有点花", next: "afterFirstExam", effects: { mind: -4 } }
        ]
      },
      solve: {
        "title": "上黑板",
        "board": "学生解法：三分钟",
        "text": "你三分钟把题讲完了。\n\n安K沉默几秒：“思路还行，但格式不够成熟。”\n\n他又晃了一下表：“周末补课费，下周别忘了。”\n\n题是你讲的，钱还是他收。",
        "choices": [
          {
            "label": "先交 200，买一周清静",
            "next": "corridor",
            "effects": {
              "money": -200,
              "mind": 6,
              "dignity": 3
            },
            "item": "收据边角"
          },
          {
            "label": "问：这题我讲的，课费能给我吗？",
            "next": "office",
            "effects": {
              "mind": -14,
              "dignity": -18
            }
          },
          {
            "label": "说家里要确认收费明细",
            "next": "receipt",
            "effects": {
              "dignity": 8
            },
            "item": "收费疑问"
          }
        ]
      },
      caught: {
        title: "被点名",
        board: "课堂纪律：别乱说",
        text: "安K耳朵很尖：“刚才谁说话？站起来。”\n\n你站了一节课。他最后补上一句：“可懂一点规矩？别让我再提醒。”",
        choices: [
          { label: "沉默忍受", next: "corridor", effects: { mind: -8, dignity: -10 } },
          { label: "悄悄记下时间地点", next: "corridor", effects: { mind: -3, dignity: -4 }, item: "课堂记录" }
        ]
      },
      office: {
        title: "办公室风暴",
        board: "老师说了算",
        text: "办公室里，安K把声音压得很低：“聪明可以，但不要自以为聪明。”\n\n隔壁老师假装整理文件。你意识到，硬碰硬会让自己掉血很快。",
        choices: [
          { label: "深呼吸，离开办公室", next: "corridor", effects: { mind: -10, dignity: -8 } },
          { label: "回去写一份完整经过", next: "corridor", effects: { mind: 2, dignity: 4 }, item: "完整经过" }
        ]
      },
      receipt: {
        title: "收费明细",
        board: "请走正规流程",
        text: "你没有当场争吵，只是问：“老师，可以给一下收费说明吗？”\n\n安K表情僵了一下：“问那么多干什么？”\n\n但这句话让旁边几个同学抬起了头。",
        choices: [
          { label: "把同学们的疑问汇总", next: "ally", effects: { mind: 4, dignity: 8 }, item: "同学名单" },
          { label: "暂时退回座位", next: "corridor", effects: { mind: 2 } }
        ]
      },
      phoneInClass: {
        title: "课上搜题",
        board: "先自己思考",
        text: "安K把一道题写在黑板上：“你们先做。”\n\n他盯着题目看了一会儿，声音忽然低了下去：“先自己思考。”说完拿着手机走到讲台侧边的角落，背对着全班。\n\n屏幕亮度压得很低，但一部分眼尖的同学还是看见了：他先把手机对准黑板停了两秒，屏幕上跳出一片熟悉的蓝白界面，下面排着几行整齐的解题步骤。\n\n后排有人小声憋笑：“又在搜题了。”旁边同学立刻用胳膊碰了碰他，示意别出声。\n\n他划了两下，肩膀绷得很紧。等他转回来的时候，题目仍然停在黑板上，像什么都没有发生。",
        photo: "课上搜题：不会题时，声音会先变小，手机会先亮一下。",
        choices: [
          { label: "低头做题，装作没看见", next: "historySelfStudy", effects: { mind: -4, dignity: -2 } },
          { label: "偷偷记录这一幕", next: "officeQuestion", effects: { mind: -2, dignity: 5 }, item: "上课玩手机记录" },
          { label: "小声吐槽：又在搜题了", next: "exam", effects: { mind: -8, dignity: -8 }, item: "手机课堂吐槽" },
          { label: "下一节看看他讲基础题", next: "lectureFluff", effects: { mind: 1 } }
        ]
      },
      lectureFluff: {
        title: "导数与单调性",
        board: "f'(x)>0，函数就增",
        text: "下一节课，题目换成了一道高中函数题。题干里写着导数、单调区间和参数范围，安K明显放松了一点，站回讲台中央，先晃一下表，金光落在黑板左上角。\n\n他点了点题干：“xxx，你来讲下这题的思路。”同学刚说到第一行，他立刻接管。每讲一句，他就晃一下表：“你看，f'(x)>0，函数就增；f'(x)<0，函数就减。这个叫导数判断单调性。单调性懂不懂？就是它往上走，它就增；它往下走，它就减。”\n\n他又顺手写下 a=b，b=c，所以 a=c，晃表：“高中数学也离不开基础。再比如数列，Sn 减 Sn-1 就是 an；概率里面，分子除以分母就是概率。圆锥曲线你们不要怕，椭圆无非就是长轴短轴，双曲线无非就是开口。”\n\n讲到原题真正需要分类讨论参数 a 的范围时，他把粉笔停住：“分类这个东西，先不要展开。你们先把基础概念吃透。基础不牢，地动山摇。”\n\n粉笔在导数符号旁边敲了三下，真正的不等式求解还是没有展开。他突然抬高声音，像给整段话盖章一样怒吼：“可是这样嘞！？”",
        photo: "导数与单调性：高中词汇很多，关键步骤还是先放放。",
        choices: [
          { label: "认真听完这套逻辑", next: "contestClass", effects: { mind: -6, dignity: 2 }, item: "导数单调性笔记" },
          { label: "偷偷把题自己做完", next: "contestClass", effects: { mind: 5, dignity: 3 }, item: "自学解题纸" },
          { label: "问：中间那步为什么成立", next: "middleStepQuestion", effects: { mind: -6, dignity: -8 }, item: "追问中间步骤" }
        ]
      },
      middleStepQuestion: {
        title: "中间那步",
        board: "先放一放",
        text: "你举手问：“老师，中间那一步为什么成立？”\n\n安K的粉笔停了一下。他没有点你上台，也没有真的讲那一步，只是晃了晃表，金光从黑板边缘扫过去。\n\n“这个地方不要钻牛角尖。”他说，“基础概念先吃透。你看，导数大于零就增，小于零就减。至于中间这个变形，这一题先放一放，下次再讲。”\n\n教室里安静了两秒。问题还在黑板上，答案却已经被推到下次了。",
        photo: "中间那步：没有被点名，但问题也没有被解答。",
        choices: [
          { label: "把没讲的地方记下来", next: "officeQuestion", effects: { mind: 2, dignity: 4 }, item: "中间步骤疑问记录" },
          { label: "低头自己补完推导", next: "contestClass", effects: { mind: 5, dignity: 2 }, item: "自学推导纸" },
          { label: "算了，先别问了", next: "corridor", effects: { mind: -4, dignity: -3 } }
        ]
      },
      classFeeOpaque: {
        title: "班费不透明",
        board: "收班费从不公示",
        text: "安K让班干部收班费，说是买资料、打印卷子、布置班级。\n\n可钱收完以后，没有明细，没有票据，也没有人知道到底花到哪里。有人小声问了一句，班干部立刻看向讲台。",
        photo: "班费不透明：钱流动得很快，明细消失得更快。",
        choices: [
          { label: "交钱，别多问", next: "eveningTutor", effects: { money: -50, mind: -5 }, item: "班费收据缺失" },
          { label: "要求公示明细", next: "ally", effects: { mind: -6, dignity: 10 }, item: "班费明细质疑" },
          { label: "偷偷记录收款名单", next: "eveningTutor", effects: { mind: -3, dignity: 5 }, item: "班费记录" }
        ]
      },
      seatByFee: {
        title: "调座位按补课费高低",
        board: "交钱多的坐前排",
        text: "新座位表贴出来，前排忽然坐满了补课最积极的人。\n\n安K解释：“这是为了提高学习效率。”\n\n可大家都看得出来，座位表上隐约写着另一套排序。",
        photo: "座位与补课费：前排像被价格标过。",
        choices: [
          { label: "沉默接受座位", next: "seatShowoff", effects: { mind: -4, dignity: -5 } },
          { label: "问：座位和补课费有关吗", next: "office", effects: { mind: -10, dignity: -15 }, item: "座位质疑" },
          { label: "拍下座位表", next: "seatShowoff", effects: { mind: -2, dignity: 6 }, item: "补课座位表照片" }
        ]
      },
      forcedVoluntaryTutor: {
        title: "强制“自愿”补课",
        board: "不补课单独谈话",
        text: "安K发下一张补课报名表，上面写着“自愿参加”。\n\n可没填的人被一个个叫去谈话：“你自己考虑清楚，别到时候后悔。”\n\n自愿两个字，被写得很大，也很轻。",
        photo: "强制自愿：纸面自愿，现实点名。",
        choices: [
          { label: "签字参加", next: "tutorLookUp", effects: { mind: -5, dignity: -5 }, item: "自愿补课表" },
          { label: "不签，等谈话", next: "earth", effects: { mind: -12, dignity: -12 }, item: "拒签补课表" },
          { label: "拍下报名表", next: "ally", effects: { mind: -3, dignity: 8 }, item: "强制自愿证据" }
        ]
      },
      kickOffice: {
        title: "踢办公室",
        board: "从教室到办公室",
        text: "午后，走廊尽头传来一声闷响。\n\n有学生被叫去办公室，门还没关严，里面传出安K的吼声。随后是椅子擦地的声音，还有手掌拍在后颈上的声音，piapia 两下，清脆得让走廊都安静了。\n\n“你给我站好。”\n\n你路过门口，看见那名学生低着头，书包被踢到墙边。",
        photo: "踢办公室：门半开着，后颈被拍得 piapia 响。",
        choices: [
          { label: "低头快步走开", next: "itemThrow", effects: { mind: -8, dignity: -5 } },
          { label: "停下来记下时间", next: "itemThrow", effects: { mind: -5, dignity: 5 }, item: "办公室体罚记录" },
          { label: "去找其他老师", next: "leaderCall", effects: { mind: -10, dignity: 8 }, item: "求助记录" }
        ]
      },
      itemThrow: {
        title: "摔/扔学生物品",
        board: "书包与早绿",
        text: "安K把学生的书包从桌边拎起来，重重摔到地上。\n\n旁边一瓶饮料滚出去，绿色瓶盖在地上转了几圈才停下。教室里没人敢动。",
        photo: "摔学生物品：东西被扔出去，人也像被扔出去。",
        choices: [
          { label: "帮同学捡起来", next: "verbalDeny", effects: { mind: -6, dignity: 6 }, item: "物品摔落记录" },
          { label: "假装没看见", next: "verbalDeny", effects: { mind: -6, dignity: -4 } },
          { label: "拍下地上的书包", next: "leaderCall", effects: { mind: -8, dignity: 8 }, item: "扔物品照片" }
        ]
      },
      verbalDeny: {
        title: "你也就这样了",
        board: "对差生的否定",
        text: "讲评试卷时，有同学小声问自己错在哪里。\n\n安K看了他一眼：“你也就这样了。”\n\n那句话像粉笔头一样砸在桌面上，不疼，但很久都擦不掉。",
        photo: "你也就这样了：一句否定，比错题更难改。",
        choices: [
          { label: "沉默，把头低下去", next: "rollAside", effects: { mind: -10, dignity: -8 } },
          { label: "写进错题本旁边", next: "girlSarcasm", effects: { mind: -4, dignity: 4 }, item: "羞辱语录记录" },
          { label: "课上听见梓豪被骂", next: "xuScold", effects: { mind: -4 }, item: "梓豪事件目击" },
          { label: "课后看见作业没写完的同学", next: "homeworkCall", effects: { mind: -3 }, item: "作业风波目击" },
          { label: "问：老师能不能讲题", next: "office", effects: { mind: -10, dignity: -15 }, item: "讲题质疑" }
        ]
      },
      rollAside: {
        title: "滚你娘嘞",
        board: "骂学生及其母亲",
        text: "有同学解释自己不是故意的。\n\n安K不耐烦地挥手：“滚你娘嘞。”\n\n教室里一下安静下来。那句话没有写在黑板上，却比黑板上的题更醒目。\n\n后来学生找他理论，他却在数学课上对全班辩解：“大家来评评理，我就讲一个滚一边去，哪个字是骂他的？可能我后面带了个娘字，他就说我骂他娘，滚一边去，娘！”",
        photo: "滚你娘嘞：一句话，把学生和家长一起扔进羞辱里。",
        choices: [
          { label: "假装没听见", next: "girlSarcasm", effects: { mind: -8, dignity: -8 } },
          { label: "记录原话", next: "girlSarcasm", effects: { mind: -4, dignity: 6 }, item: "滚你娘嘞原话记录" },
          { label: "小声说太过分了", next: "caught", effects: { mind: -10, dignity: -15 }, item: "替同学出声" }
        ]
      },
      girlSarcasm: {
        title: "对女生的阴阳怪气",
        board: "女孩子学什么理科",
        text: "一道物理题讲到一半，安K突然看向前排女生。\n\n“女孩子嘛，别总想着硬搞理科，差不多就行。”他说得很随意，像在讲天气。\n\n前排女生眼眶红了一下，又很快低下头。",
        photo: "阴阳怪气：轻飘飘一句话，压得人抬不起头。",
        choices: [
          { label: "假装没听见", next: "scarForget", effects: { mind: -8, dignity: -6 } },
          { label: "课后安慰她", next: "corridor", effects: { mind: -4, dignity: 8 }, item: "女生同学信任" },
          { label: "当场说这不公平", next: "office", effects: { mind: -12, dignity: -18 }, item: "性别羞辱质疑" }
        ]
      },
      scarForget: {
        title: "好了伤疤忘了疼",
        board: "空调事件里的台词",
        text: "空调事件过后，有同学又忍不住抱怨教室太热。\n\n安K冷笑：“好了伤疤忘了疼？”\n\n窗外太阳很亮，教室里却像突然少了一点空气。",
        photo: "好了伤疤忘了疼：热是真的，讽刺也是真的。",
        choices: [
          { label: "不再说话", next: "corridor", effects: { mind: -7, dignity: -5 } },
          { label: "把这句也记下来", next: "corridor", effects: { mind: -3, dignity: 5 }, item: "好了伤疤忘了疼记录" },
          { label: "去接一杯水", next: "corridor", effects: { mind: 2, dignity: 2 }, item: "热天自救" }
        ]
      },
      leaderCall: {
        title: "在领导面前给家长打电话",
        board: "先给家长听话术",
        text: "年级领导路过办公室，安K立刻换了语气。\n\n他当着领导的面给家长打电话：“您孩子最近状态不太稳定，我一直在帮他。”\n\n学生站在旁边，听着自己的事被讲成另一种版本。",
        photo: "领导面前：话术突然变得体面。",
        choices: [
          { label: "沉默听完", next: "corridor", effects: { mind: -10, dignity: -8 } },
          { label: "把通话内容记下来", next: "ally", effects: { mind: -4, dignity: 8 }, item: "领导面前电话记录" },
          { label: "当场补充事实", next: "office", effects: { mind: -12, dignity: -15 }, item: "当场补充事实" }
        ]
      },
      xuScold: {
        title: "徐梓豪被骂你可蠢",
        board: "听戏一样",
        text: "数学课上，徐梓豪因为一件小事被叫到讲台旁。\n\n安K盯着他：“你可蠢？”这句话在教室里转了一圈，最后落在每个人桌上。他又补了一句：“你怎么跟听戏的一样！”\n\n梓豪低着头，像突然被全班的目光压住。安K走近一步，手掌往他后颈上一拍，piapia 一声，清脆得像给这句羞辱盖章。\n\n黑板上的题还停在半截，讲台上的声音却比题目更响。",
        photo: "你可蠢：一句口头禅，再加一记后颈上的 piapia。",
        choices: [
          { label: "低头不看", next: "corridor", effects: { mind: -6, dignity: -5 } },
          { label: "课后安慰梓豪：他讲课跟唱戏一样", next: "corridor", effects: { mind: -3, dignity: 10 }, item: "唱戏式安慰梓豪" },
          { label: "记录原话", next: "ally", effects: { mind: -3, dignity: 5 }, item: "你可蠢原话记录" },
          { label: "深夜刷到一条QQ空间动态", next: "easterMagic" }
        ]
      },
      corridor: {
        "title": "走廊随机事件",
        "board": "课间十分钟",
        "text": "走廊里电瓶车铃声从远处飘来。安K戴着粉色头盔缓缓经过，耐克袖口一露，他又晃了晃表，反光扫过墙上的“文明校园”。\n\n下一件事会发生什么？",
        "choices": [
          {
            "label": "补课收费线",
            "next": "fee"
          },
          {
            "label": "课堂考试线",
            "next": "phoneInClass"
          },
          {
            "label": "纪律体罚线",
            "next": "hairCheck"
          },
          {
            "label": "语言羞辱线",
            "next": "verbalDeny"
          },
          {
            "label": "装备推销线",
            "next": "phoneCard"
          },
          {
            "label": "校园怪论线",
            "next": "resonance"
          },
          {
            "label": "又有人被要求抬头",
            "next": "headUpRule"
          },
          {
            "label": "检查男女一米距离",
            "next": "distanceRule"
          },
          {
            "label": "班会突然讲起早恋",
            "next": "romanceRule"
          }
        ]
      },
      studentLoan: {
        title: "助学贷款",
        board: "贫困生标志",
        text: "钱包见底，你在走廊尽头填下助学贷款申请。\n\n安K瞥了一眼表，哼了一声：“哼~你说你家里穷，原始社会你更穷！”\n\n钱到账了，话也到账了。你把这张申请单塞进书包，知道它以后还会被提起。",
        photo: "助学贷款：钱回来了，尊严又被扣了一笔。",
        choices: [
          { label: "收下贷款，回到刚才的事", action: "returnFromLoan" }
        ]
      },
      easterPraise: {
        title: "学长作品：《安K先生赞》",
        board: "班级电脑里的旧文件",
        text: "📜 你发现了一份学长留下的文件：《安K先生赞》\n\n“吾闻羊圈之犊，其行无不似羊也。今子幸甚，得入安K先生之门……”\n\n你读完后深吸一口气。原来早就有人看穿了一切，还写成了文言文。\n\n理智 +8，尊严 +8\n\n🔗 联动解锁：被骂“你可懂一点规矩”时，尊严损失减半。",
        photo: "学长遗迹 C01：文学批判，理智 +8，尊严 +8。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《安堃先生赞》.txt" },
          { label: "把它存进书包，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 8, dignity: 8 }, item: "学长作品：《安K先生赞》" }
        ]
      },
      easterBiography: {
        title: "学长作品：《安K传》",
        board: "课桌抽屉手抄本",
        text: "📖 你在教室最后一排的课桌抽屉里翻到一个手抄本：《安K传》\n\n“安K者，阜阳临泉人也，号骚粉骑士。尝从事于十一中，后入成角……”\n\n你忍不住笑了一声，又赶紧捂住嘴。\n\n理智 +7，尊严 +9\n\n🔗 联动解锁：与同学对话时出现“你是懂安K的”选项，好感额外 +5。",
        photo: "学长遗迹 C02：后排课桌藏着传记，理智 +7，尊严 +9。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《安堃传》.txt" },
          { label: "把手抄本放回原处，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 7, dignity: 9 }, item: "学长作品：《安K传》" }
        ]
      },
      easterLoveLetter: {
        title: "学长作品：《写给安K表白书》",
        board: "QQ空间表白墙",
        text: "💌 你在 QQ 空间刷到一条匿名投稿：《写给安K表白书》\n\n“你虽题目不会，却仍坚持补课收费……KK，我爱你！”\n\n你知道这是讽刺，但底下真的有人问：“这是真心的吗？”你沉默了。\n\n理智 +9，尊严 +6\n\n🔗 联动解锁：被迫夸他时，诚恳不被察觉，尊严反升 +5。",
        photo: "学长遗迹 C03：表白墙文学，理智 +9，尊严 +6。",
        image: "《写给安堃表白书》.jpg",
        choices: [
          { label: "打开原图", action: "openFile", file: "《写给安堃表白书》.jpg" },
          { label: "保存这张投稿图，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 9, dignity: 6 }, item: "学长作品：《写给安K表白书》" }
        ]
      },
      easterAnnualPerson: {
        title: "学长作品：《感动成角年度人物》",
        board: "班级群网盘",
        text: "🖋 你在班级群文件里发现了一个文档：《2020感动成角年度人物——安K》\n\n“你挥一挥衣袖，不落下一分一毫。你晃一晃手腕，不跳过一题一问。”\n\n你把颁奖词从头读到尾，手心全是汗。\n\n理智 +10，尊严 +10\n\n🔗 联动解锁：安K说原话时，你可预判下一句，理智额外 +5。",
        photo: "学长遗迹 C04：颁奖词一出，理智 +10，尊严 +10。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《感动城郊年度人物》.txt" },
          { label: "收好这份文档，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 10, dignity: 10 }, item: "学长作品：《感动成角年度人物》" }
        ]
      },
      easterCamel: {
        title: "学长作品：《沙漠骆驼·安K版》",
        board: "云盘音乐链接",
        text: "🎵 同学分享了一个云盘链接，点开是《沙漠骆驼》的重新填词版\n\n“安K脸大腿粗肉多，粉盔电瓶摩托……这一题先跳过，讲课不知对错……”\n\n你跟着哼了两句，突然又觉得有点苦。\n\n理智 +8，尊严 +7\n\n🔗 联动解锁：听到“这一题先放一放”或“这一题下次再讲”时，内心默唱，理智损失减半。",
        photo: "学长遗迹 C05：音乐链接里的集体吐槽，理智 +8，尊严 +7。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《沙漠骆驼·安堃版》.docx" },
          { label: "把链接转存，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 8, dignity: 7 }, item: "学长作品：《沙漠骆驼·安K版》" }
        ]
      },
      easterMagic: {
        title: "学长作品：《巴拉拉坤魔仙》",
        board: "深夜 QQ 空间动态",
        text: "✨ 深夜刷 QQ 空间，你看到一首改编歌词：《巴拉拉坤魔仙》\n\n“安安安坤魔仙，梓豪一捣蛋，就是开正义的一战……”\n\n你把手机亮度调低，又看了一遍。\n\n理智 +6，尊严 +9\n\n🔗 联动解锁：被安K动手时，内心默念坤魔仙，尊严损失减半。",
        photo: "学长遗迹 C06：深夜动态，理智 +6，尊严 +9。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《巴拉拉坤魔仙》.docx" },
          { label: "给动态点个仅自己可见的赞，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 6, dignity: 9 }, item: "学长作品：《巴拉拉坤魔仙》" }
        ]
      },
      easterAlienNovel: {
        title: "学长作品：《谁不是地球人》",
        board: "机房隐藏文件夹",
        text: "📚 你在学校机房的隐藏文件夹里找到一篇小说：《谁不是地球人》\n\n“胡稳龙，你可是有病？！……安K晃了晃左手，左手腕上的那块金表，额外耀眼。”\n\n你关上电脑，在走廊站了很久。\n\n理智 +10，尊严 +12\n\n🔗 联动解锁：安K说“你可是地球人”时，出现隐藏选项“引用小说台词反击”，选后安K语塞一瞬，尊严 +10。",
        photo: "学长遗迹 C07：小说比现实还像现实，理智 +10，尊严 +12。",
        choices: [
          { label: "打开原文件", action: "openFile", file: "《谁不是地球人》.txt" },
          { label: "把文件名记下来，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 10, dignity: 12 }, item: "学长作品：《谁不是地球人》" }
        ]
      },
      easterTutorPoster: {
        title: "学长作品：《安老师补课班宣传海报》",
        board: "旧群文件宣传图",
        text: "你在补课收费线索里翻到一张旧海报：《安老师补课班宣传海报》。\n\n海报上的字写得热血沸腾，像是只要交钱，数学就会自动开窍。角落里还有一行小字：名额有限，抬头优先。\n\n你盯着那张图看了半天，终于确认：原来学长们早就把荒诞做成了平面设计。",
        photo: "学长遗迹 C08：宣传海报冲击力太强，理智 +9，尊严 +11。",
        image: "《安老师补课班宣传海报》.jpg",
        choices: [
          { label: "打开原图", action: "openFile", file: "《安老师补课班宣传海报》.jpg" },
          { label: "把海报存档，回到刚才的位置", action: "collectWorkReturn", effects: { mind: 9, dignity: 11 }, item: "学长作品：《安老师补课班宣传海报》" }
        ]
      },
      fee: {
        title: "补课收费",
        board: "时间就是金钱",
        text: "补课风波正式开始。安K要求全班周末补课，收费。\n\n“一节 200。”他故意晃表，金表在灯下闪了一下，“抬头，时间就是金钱。”\n\n有人小声问假期是不是该休息，安K立刻接上：“我跟太和一中的老师聊天，人家都说了，假期不补课，那才不正常。”\n\n你看着那道反光，突然觉得这句话确实很完整。现在问题来了：你交，还是不交？",
        photo: "补课风波：选择交钱、拖延，还是要求说明。",
        choices: [
          { label: "当场交钱", next: "feePayResult", effects: { money: -200, mind: 5 }, item: "补课票根" },
          { label: "说：我再考虑考虑", next: "feeDelayResult", effects: { dignity: -10 }, item: "收费疑问" },
          { label: "拒绝", next: "feeRejectResult", effects: { mind: -20, dignity: -20 }, item: "拒交记录" },
          { label: "问：假期不补课才不正常吗", next: "tutorNotNormal", effects: { mind: -3 }, item: "补课不正常疑问" },
          { label: "翻旧群文件里的宣传海报", next: "easterTutorPoster" }
        ]
      },
      tutorNotNormal: {
        title: "补课不正常",
        board: "权威来源",
        text: "安K站在讲台上，双手撑桌，金表磕在桌面上发出轻响。\n\n“我跟你们说，前几天我跟太和一中老师聊天，人家老师说，假期不补课，那才不正常！”\n\n他顿了顿，扫视全班，像是在等掌声。\n\n“听懂没有？人家名校都补，你们还有什么好说的？”\n\n教室里一片沉默。你低下头，心里在想什么？",
        photo: "补课不正常：一句外校老师，变成收费理由。",
        choices: [
          { label: "沉默不语", next: "winterTutor", effects: { mind: -5 } },
          { label: "小声说：太和一中关我们什么事", next: "feeDelayResult", effects: { mind: -10, dignity: -10 }, item: "太和一中吐槽" },
          { label: "举手问：那我们一补课就爱学习吗", next: "office", effects: { mind: -15, dignity: -15 }, item: "补课逻辑质疑" },
          { label: "私下跟同学说：他又在找借口", next: "hotelTutor", effects: { dignity: 5 }, item: "假期补课共感" }
        ]
      },
      feePayResult: {
        title: "当场交钱",
        board: "态度良好",
        text: "你当场交了 200。\n\n钱包 -200，理智 +5。安K对你的态度短暂好转，像天气预报里难得的晴天。\n\n可你很清楚，这只是下一次收费前的平静。",
        photo: "当场交钱：一张票根，换来几天安静。",
        choices: [
          { label: "进入补课", next: "tutorLookUp" },
          { label: "顺手又收班费", next: "classFeeOpaque" },
          { label: "暑假酒店补课通知来了", next: "hotelTutor" },
          { label: "寒假补课又来了", next: "winterTutor" }
        ]
      },
      feeDelayResult: {
        title: "再考虑考虑",
        board: "你可懂一点规矩",
        text: "安K冷笑：“考虑？你可懂一点规矩？”\n\n尊严 -10。你被他记在小本本上，下一次点名时大概率会被精准锁定。",
        photo: "拖延交费：没有省钱，只是延长了审判。",
        choices: [
          { label: "进入补课", next: "tutorLookUp" },
          { label: "班费也开始收了", next: "classFeeOpaque" },
          { label: "继续面对寒假报价", next: "winterTutor" }
        ]
      },
      feeRejectResult: {
        title: "拒绝补课",
        board: "还想考大学？",
        text: "安K大怒：“你不交钱，还想考大学？”\n\n此后一周被针对。理智 -20，尊严 -20。你开始理解为什么很多人选择沉默。",
        photo: "拒绝补课：代价立刻出现。",
        choices: [
          { label: "进入补课", next: "tutorLookUp" },
          { label: "被要求填自愿表", next: "forcedVoluntaryTutor" },
          { label: "寒假报价继续追来", next: "winterTutor" }
        ]
      },
      earth: {
        title: "不是地球人",
        board: "地球人守则",
        text: "安K站在讲台上：“我们地球人讲规矩、懂分寸、尊重老师。”\n\n他看向全班：“我看你们有些人，分分钟都不像地球人。”\n\n全班安静。你听见自己的笔尖在纸上停住。",
        choices: [
          { label: "低头，先保护理智", next: "longLaugh", effects: { mind: -8, dignity: -5 }, item: "地球人训话记忆" },
          { label: "小声说：过分了吧", next: "earthWhisperResult", effects: { mind: -20, dignity: -20 }, item: "不是地球人原话" },
          { label: "抬头说：地球人也需要规则", next: "longLaugh", effects: { mind: -8, dignity: 12 }, item: "地球人反击" }
        ]
      },
      earthWhisperResult: {
        title: "过分了吧",
        board: "你也想当外星人？",
        text: "你的声音很小，但还是被安K听见。\n\n他眯起眼：“你也想当外星人？”\n\n理智 -20，尊严 -20，并被罚站一节课。全班再次进入静音模式。",
        photo: "不是地球人：一句小声反抗，也会被放大。",
        choices: [
          { label: "下一节课", next: "longLaugh" }
        ]
      },
      ac: {
        title: "猥琐事件",
        board: "夏天很热",
        text: "夏天到了，新教室明明有空调，安K不准开。\n\n某同学自己用饭卡充了六块钱，大家围过去吹，终于感到一阵短暂的凉意。\n\n安K冲进来：“谁让你们开的？有一个词叫猥琐！”\n\n冷风停了，汗又回来了。",
        photo: "猥琐事件：六块钱的冷风，换来一场训话。",
        choices: [
          { label: "忍着，保存体力", next: "monitorFee", effects: { mind: -8, dignity: -4 } },
          { label: "记录温度和饭卡扣费", next: "monitorFee", effects: { mind: 1, dignity: 4 }, item: "空调记录" },
          { label: "递水给快中暑的同学", next: "monitorFee", effects: { money: -5, mind: 5, dignity: 7 }, item: "同学信任" }
        ]
      },
      pencil: {
        title: "铅笔戳破事件",
        board: "工作量与规则",
        text: "安K在讲台边检查作业，有同学的铅笔把试卷戳破了一个小洞。\n\n他皱起眉：“这是我额外的工作量！你们懂不懂规矩？”\n\n那张卷子被举起来，全班像在观看一场很小但很严肃的事故。",
        choices: [
          { label: "交两块钱赔偿", next: "homeworkCall", effects: { money: -2 }, item: "两元赔偿记录" },
          { label: "说：这卷子不是学校的吗", next: "office", effects: { dignity: -15 }, item: "卷子疑问" },
          { label: "事后偷偷安慰同学", next: "homeworkCall", effects: { dignity: 10 }, item: "同学信任" }
        ]
      },
      homeworkCall: {
        title: "作业没写完",
        board: "你自己给家长打",
        text: "晚自习前，安K检查作业，发现有个同学还差几题没写完。\n\n他把手机往桌上一推：“你自己给你家长打电话，说你作业没写完。”\n\n那个同学沉默了几秒，抬头顶了一句：“要打电话你打去，是你要打的，不是我要打。”\n\n教室里的空气一下绷紧。安K勃然大怒：“你可讲理！你可讲理！你咋不按套路出牌？你不按套路出牌是吧，我也不按套路出牌！”\n\n他一边吼，一边晃表，金光在桌面上跳了一下。",
        photo: "作业没写完：电话还没拨出去，套路先崩了。",
        choices: [
          { label: "低头装作没听见", next: "callParents", effects: { mind: -8, dignity: -6 } },
          { label: "偷偷记下原话", next: "leaderCall", effects: { mind: -4, dignity: 8 }, item: "你可讲理原话记录" },
          { label: "课后安慰那个同学", next: "callParents", effects: { mind: -4, dignity: 10 }, item: "作业风波同学信任" },
          { label: "第二天遇到突击查作业", next: "homeworkRaid", effects: { mind: -4 }, item: "突击查作业预感" },
          { label: "继续低头补作业，熬到下次考试", next: "rankAfterExam", effects: { mind: -3, dignity: -2 }, item: "晚自习补作业记忆" }
        ]
      },
      homeworkRaid: {
        title: "突击查作业",
        board: "办公室罚蹲",
        text: "下午最后一节课快下课时，安K突然把练习册一收：“现在查作业。”\n\n没写完的人被一个个点出来，排成半条队。他晃了晃表，像是在宣布一个临时判决：“作业没写完的，去办公室蹲着补。晚饭先别吃了，什么时候写完什么时候说。”\n\n队伍往办公室挪的时候，他习惯性地用手掌拍后颈催人，piapia 几声连在一起。梓豪挨过，稳龙挨过，现在作业没写完的同学也挨这一掌。\n\n办公室门口很快挤满了人。有人抱着练习册蹲在墙边，有人肚子叫了一声又赶紧低头。你数了数，几乎半个班都在这里。",
        photo: "突击查作业：练习册没补完，后颈也要 piapia 响。",
        choices: [
          { label: "蹲下补作业，别再出声", next: "dictationPunish", effects: { mind: -10, dignity: -8 }, item: "办公室罚蹲记忆" },
          { label: "偷偷把人数和时间记下来", next: "dictationPunish", effects: { mind: -4, dignity: 8 }, item: "办公室罚蹲记录" },
          { label: "学生反击：不吃饭怎么上晚自习", next: "office", effects: { mind: -14, dignity: 12 }, item: "晚饭反击记录" }
        ]
      },
      dictationPunish: {
        title: "早自习听写",
        board: "错三个蹲办公室",
        text: "第二天早自习，语文和英语听写连着来。安K站在门口看名单，像在查另一份作业。\n\n“错三个的，去办公室蹲着。”他说，“早饭先别吃了，什么时候改完什么时候出来。”\n\n一个又一个名字被念到。办公室外的走廊慢慢蹲满了人，背单词的、改错的、捂着肚子的挤在一起。你看着那半个班的人，忽然觉得早自习像一场没有铃声的体罚。",
        photo: "早自习听写：错三个字，早饭也被判了错。",
        choices: [
          { label: "低头改错，保存体力", next: "corridor", effects: { mind: -8, dignity: -6 } },
          { label: "把规则写进记录本", next: "ally", effects: { mind: -3, dignity: 8 }, item: "听写罚蹲记录" },
          { label: "小声问：吃早饭也算违纪吗", next: "caught", effects: { mind: -10, dignity: -12 }, item: "早饭质疑" }
        ]
      },
      gradingFee: {
        title: "批卷子收费",
        board: "额外工作量",
        text: "月考卷发下来前，安K站在讲台边，先把一摞试卷拍齐。\n\n“我给你们批试卷，不是学校安排的任务。”他说，“这是我自己的额外工作量。两块钱一张，这学期先统一收齐。”\n\n卷子传下来时，你看见错题旁边的红 X 打得很夸张，两个弯钩绞在一起，像一只只红色蝴蝶结趴在题目旁边。\n\n桌上被放出一个小盒子，八十块一份陆续落进去。大家这才明白：连这些蝴蝶结一样的红叉，也被算成了收费项目。",
        photo: "批卷子收费：两块钱一张试卷，最后被一次收成一学期的钱。",
        choices: [
          { label: "交 80 元领试卷", next: "gradingPayResult", effects: { money: -80 }, item: "批卷子一学期费用" },
          { label: "说：批试卷不是老师工作吗", next: "gradingQuestionResult", effects: { dignity: -15 }, item: "卷子收费质疑" },
          { label: "班长生气地上前理论", next: "gradingMonitorResult", effects: { mind: -8, dignity: 5 }, item: "班长理论记录" },
          { label: "先记下这次收费", next: "gradingRecordResult", effects: { mind: 2, dignity: 5 }, item: "批卷收费记录" }
        ]
      },
      gradingPayResult: {
        title: "交 80 元领试卷",
        board: "无事发生",
        text: "你交了 80 元，才拿到自己的试卷。\n\n钱包 -80。卷子上红叉很多，安K打 X 的地方一个比一个花，像一排红色蝴蝶结。可最醒目的，还是那句“额外工作量”。纸币落进盒子里的声音，在你脑子里响了很久。",
        photo: "批卷收费：一学期的钱，被装进一个小盒子。",
        choices: [
          { label: "回到走廊", next: "corridor" }
        ]
      },
      gradingQuestionResult: {
        title: "批试卷不是老师工作吗",
        board: "以后卷子只收你四块",
        text: "你小声问：“老师，批试卷不是老师工作吗？”\n\n安K抬头：“这是我额外的工作量！你懂不懂规矩？”\n\n尊严 -15。此后批卷子只收你四块。\n\n你终于明白，提问有时会让收费标准变得更有针对性。",
        photo: "质疑收费：问题没有答案，价格有了变化。",
        choices: [
          { label: "回到走廊", next: "corridor" }
        ]
      },
      gradingMonitorResult: {
        title: "班长被撤职",
        board: "额外工作量",
        text: "班长终于忍不住站起来：“老师，批试卷本来不就是老师的工作吗？为什么还要收钱？”\n\n教室里一下安静。安K把粉笔往讲台上一放，晃表的动作停了半秒。\n\n“这是学校给我的任务吗？”他冷着脸说，“这是我额外的工作量。你作为班长，不想着维护班级秩序，带头跟老师顶？”\n\n第二天，班干部名单被重新贴出来。班长的名字不见了。\n\n大家路过那张纸时都看了一眼，又很快把目光移开。",
        photo: "班长撤职：两块钱一张试卷，最后变成了一张新名单。",
        choices: [
          { label: "默默记下撤职经过", next: "ally", effects: { mind: -4, dignity: 8 }, item: "班长撤职记录" },
          { label: "装作没看见", next: "corridor", effects: { mind: -8, dignity: -5 } },
          { label: "课后安慰班长", next: "corridor", effects: { mind: -4, dignity: 10 }, item: "班长信任" }
        ]
      },
      gradingRecordResult: {
        title: "先记下这次收费",
        board: "批卷收费记录",
        text: "你没有当场争执，只把时间、地点、金额和原话记下来：批试卷，两块钱一张，一学期统一收 80 元，理由是额外工作量。\n\n你还在旁边画了一个红 X 的样子：两笔弯得像蝴蝶结，几乎比批改本身还用力。\n\n这次没有起冲突。理智 +2，尊严 +5。证据本又厚了一页。",
        photo: "记录收费：不响亮，但有用。",
        choices: [
          { label: "回到走廊", next: "corridor" }
        ]
      },
      tutorLookUp: {
        title: "补课时被要求抬头",
        board: "抬头晃表",
        text: "补课时，安K念着答案，忽然敲了敲桌子：“抬头！我讲课你们低什么头？”\n\n同学们一抬头，正好看见他最熟练的动作：抬腕、晃表，金表随即在灯下发光。题目还停在刚才那一步。",
        photo: "补课时抬头：天赋损失，心里厌恶，但安K满意。",
        choices: [
          { label: "抬头看他晃表", next: "tutorLookResult", effects: { mind: -5 }, item: "金表反光记忆" },
          { label: "低头假装没听见", next: "tutorIgnoreResult", effects: { mind: -15, dignity: -10 } },
          { label: "抬头说：老师，这题我还是不会", next: "tutorQuestionResult", effects: { dignity: -5 }, item: "被跳过的问题" }
        ]
      },
      tutorLookResult: {
        title: "抬头晃表",
        board: "安K满意地点点头",
        text: "你抬头看他晃表，金表反光在黑板和你眼前来回跳。\n\n天赋没有真的损失，但内心厌恶。理智 -5。安K满意地点点头，继续把答案念完。",
        photo: "抬头晃表：题没懂，但姿态正确。",
        choices: [
          { label: "进入猥琐事件", next: "ac" }
        ]
      },
      tutorIgnoreResult: {
        title: "假装没听见",
        board: "听不懂人话？",
        text: "你低头假装没听见。\n\n安K走过来拍你后颈：“听不懂人话？”\n\n理智 -15，尊严 -10。你的笔尖在纸上停了很久。",
        photo: "假装没听见：沉默也会被追上。",
        choices: [
          { label: "进入猥琐事件", next: "ac" }
        ]
      },
      tutorQuestionResult: {
        title: "这题我还是不会",
        board: "先跳过",
        text: "你抬头说：“老师，这题我还是不会。”\n\n安K沉默三秒：“这一题……先跳过。”然后继续晃表。\n\n尊严 -5。问题还在那里，没有被解决。",
        photo: "继续提问：答案依然绕开了你。",
        choices: [
          { label: "进入猥琐事件", next: "ac" }
        ]
      },
      pantsPull: {
        title: "同学衣领被推拉拽",
        board: "别逼我动手",
        text: "走廊尽头，梓豪被安K拽住衣领推推搡搡。\n\n安K说：“你也想试试？”说完手掌往他后颈上一拍，piapia 一声，像在给自己的话配音。旁边的稳龙愣在原地，手里还拿着没写完的作业。\n\n你站在几米外，必须决定要不要上前。",
        photo: "推拉拽事件：后颈一响，走廊比教室更安静。",
        choices: [
          { label: "上前劝说", next: "pantsInterveneResult", effects: { mind: -15, dignity: -15 }, item: "梓豪事件记录" },
          { label: "当作没看见", next: "pantsIgnoreResult", effects: { mind: -5 }, item: "沉默的走廊" },
          { label: "事后偷偷安慰梓豪", next: "longSleep", effects: { dignity: 10 }, item: "梓豪的信任" },
          { label: "有人转来一首改编歌", next: "easterMagic" }
        ]
      },
      pantsInterveneResult: {
        title: "上前劝说",
        board: "你也想试试？",
        text: "你上前劝说。\n\n安K转头：“你也想试试？”你被推了一把。理智 -15，尊严 -15。\n\n梓豪看了你一眼，没有说话，但你知道他记住了。",
        photo: "上前劝说：不是胜利，但不是旁观。",
        choices: [
          { label: "下一次，稳龙睡着了", next: "longSleep" }
        ]
      },
      pantsIgnoreResult: {
        title: "当作没看见",
        board: "内心愧疚，但安全",
        text: "你当作没看见。\n\n理智 -5。你安全地走开了，但这条走廊从此变得有点长。",
        photo: "当作没看见：安全，有时也会留下回声。",
        choices: [
          { label: "下一次，稳龙睡着了", next: "longSleep" }
        ]
      },
      roast: {
        title: "锐评其他老师",
        board: "一节数学课的岔路",
        text: "安K一整节数学课都没讲题，而是在讲台上锐评其他老师。\n\n“你看那个xx振，拍马屁拍的，可让人恶心！”他说得很激动，粉笔在手里快要折断。\n\n他又转向另一个名字：“还有那个xx峰，看似忠厚尽干些不要脸的事，告人黑状，可要点脸！真是应了那句老话，不是老人变坏了，是坏人变老了！”\n\n你看着黑板上的半道题，突然意识到今天又要靠自己补完。",
        choices: [
          { label: "认真听，并记笔记", next: "roastListenResult", effects: { mind: -15, dignity: 10 }, item: "阴阳笔记" },
          { label: "偷偷做数学题", next: "roastStudyResult", effects: { dignity: -10 }, item: "半页草稿" },
          { label: "举手说：老师，这节是数学课", next: "roastInterruptResult", effects: { dignity: -30, mind: -20 } }
        ]
      },
      roastListenResult: {
        title: "认真听，并记笔记",
        board: "懂事的学生",
        text: "你认真听完，还记了几条原话。\n\n安K觉得你是“懂事的”，尊严 +10；但因为听了太多废话，理智 -15。\n\n你的数学题仍然空着。",
        photo: "认真听锐评：有记录，也有精神污染。",
        choices: [
          { label: "回到走廊", next: "corridor" }
        ]
      },
      roastStudyResult: {
        title: "偷偷做数学题",
        board: "我讲话你不听？",
        text: "你趁他锐评时偷偷做题。\n\n安K突然停下：“我讲话你不听？”尊严 -10。\n\n黑板上的题没讲，你自己也没能安静写完。",
        photo: "偷偷做题：自救失败，被精准发现。",
        choices: [
          { label: "回到走廊", next: "corridor" }
        ]
      },
      roastInterruptResult: {
        title: "这节是数学课",
        board: "你可讲理？",
        text: "你举手说：“老师，这节是数学课。”\n\n安K沉默三秒，然后怒斥：“你可讲理？”尊严 -30，理智 -20，被罚站到走廊。\n\n那半道题最终还是没讲。",
        photo: "打断锐评：你讲的是事实，他讲的是规矩。",
        choices: [
          { label: "去走廊罚站", next: "corridor" }
        ]
      },
      exam: {
        title: "手表风波",
        board: "不准带表",
        text: "考试前，安K强调：“谁带手表我跟谁急。”\n\n可有人不小心把表放在考场外被查到，监考费泡汤。安K怒气冲进教室，左右手一起晃表，两道反光扫过讲台。\n\n这画面很难不让人沉思。",
        choices: [
          { label: "假装自己是课桌", next: "rankAfterExam", effects: { mind: -9, dignity: -2 } },
          { label: "录下训话关键词", next: "monitorFee", effects: { mind: -4, dignity: 6 }, item: "录音线索" },
          { label: "提醒同学走正规反馈", next: "rankAfterExam", effects: { mind: 3, dignity: 8 }, item: "反馈渠道" }
        ]
      },
      phoneCard: {
        title: "索要身份证办电话卡",
        board: "学业水平测试还有三个月",
        text: "午后，安K推着粉色电瓶车停在楼下，拿出一张名单。\n\n“全班把身份证交上来，统一办电话卡。”他说得很自然，像是在收作业。\n\n有人提醒学业水平测试还早，安K晃了晃表：“早准备，懂不懂规矩？”\n\n同学们面面相觑。距离学业水平测试，实际上还有三个月。",
        choices: [
          { label: "交出身份证办卡", next: "phonePayResult", effects: { money: -80, dignity: -5 }, item: "电话卡与身份证记录" },
          { label: "说：我已经有卡了", next: "phoneHasCardResult", effects: { dignity: -10 }, item: "已有电话卡记录" },
          { label: "拒绝交身份证", next: "phoneRejectResult", effects: { mind: -15 }, item: "拒交身份证记录" }
        ]
      },
      phonePayResult: {
        title: "交出身份证",
        board: "安K满意",
        text: "你把身份证交了上去，又交了一笔办卡钱。\n\n钱包 -80，尊严 -5。安K满意地点点头，在名单后面画了个勾。\n\n那张电话卡后来被你塞进书包最底层，从此再也没有拿出来。",
        photo: "交身份证办卡：一个勾，换来一张没怎么用过的卡。",
        choices: [
          { label: "再看一眼电瓶车", next: "carUpgrade" }
        ]
      },
      phoneHasCardResult: {
        title: "我已经有卡了",
        board: "已有也得交",
        text: "你说：“我已经有电话卡了。”\n\n安K皱眉：“已有就不能再办？这是为学业水平测试准备。”尊严 -10。\n\n你看着名单上密密麻麻的名字，第一次发现，已经拥有并不等于可以拒绝。",
        photo: "已有电话卡：理由被当成态度问题，身份证还是被惦记着。",
        choices: [
          { label: "绕到楼下", next: "carUpgrade" }
        ]
      },
      phoneRejectResult: {
        title: "拒绝交身份证",
        board: "还有三个月的明天",
        text: "你拒绝交身份证。\n\n安K脸色立刻沉下来：“哼~明天学业水平测试，你不带身份证？？”\n\n全班安静了一秒。你在心里算了算日期：距离学业水平测试，其实还有三个月。\n\n理智 -15。粉色电瓶车慢慢开走，留下你和一堆问号。",
        photo: "拒绝交身份证：明明还有三个月，却被说成明天。",
        choices: [
          { label: "走到楼下", next: "carUpgrade" }
        ]
      },
      monitorFee: {
        title: "监考费惨案",
        board: "手表与监考费",
        text: "学业水平测试前，安K反复强调：“不许带手表。”\n\n结果有学生带了，他的监考费被扣。安K冲进班上咆哮：“你可是地球人？”\n\n他一边吼一边晃表，两道反光像给怒气打了聚光灯。",
        photo: "监考费惨案：不许带手表的训话，由戴表的人发出。",
        choices: [
          { label: "沉默", next: "monitorSilentResult", effects: { mind: -10 } },
          { label: "小声说：他自己也戴表", next: "monitorWhisperResult", effects: { dignity: -25 }, item: "双表目击" },
          { label: "举手说：老师，您手上也戴着表", next: "monitorCalloutResult", effects: { dignity: -40, mind: -30 }, item: "勇气发言" }
        ]
      },
      monitorSilentResult: {
        title: "沉默",
        board: "又一次吞下去",
        text: "你沉默。\n\n理智 -10。你盯着桌面，等怒气过去。教室里只有安K的声音和晃表反光。",
        photo: "沉默：安全，但会消耗。",
        choices: [
          { label: "课后走到楼下透口气", next: "carUpgrade" },
          { label: "把这段事压进心里，继续上课", next: "farewellQuote", effects: { mind: -4 } }
        ]
      },
      monitorWhisperResult: {
        title: "他自己也戴表",
        board: "你说什么",
        text: "你小声说：“他自己也戴表。”\n\n还是被安K听到：“你说什么？”尊严 -25，并被要求写 500 字检讨。\n\n检讨写到一半，你看见他又抬手看了眼表。",
        photo: "小声吐槽：声音很轻，检讨很长。",
        choices: [
          { label: "把检讨拍照留底", next: "preFinalWeek", effects: { mind: -4, dignity: 4 }, item: "监考费检讨照片" },
          { label: "去找同学核对当天经过", next: "ally", effects: { mind: 2, dignity: 5 }, item: "监考费同学证词" }
        ]
      },
      monitorCalloutResult: {
        title: "您手上也戴着表",
        board: "很好，很有种",
        text: "你举手说：“老师，您手上也戴着表。”\n\n安K极反笑：“很好，很有种。”此后成为重点关注对象。尊严 -40，理智 -30。\n\n你赢了逻辑，输了安静。",
        photo: "当面指出：真话有重量，也有代价。",
        choices: [
          { label: "被重点盯了一周", next: "farewellQuote", effects: { mind: -8, dignity: -8 }, item: "重点关注名单" },
          { label: "把这次发言写进材料", next: "preFinalWeek", effects: { mind: 2, dignity: 6 }, item: "双表事件材料" }
        ]
      },
      carUpgrade: {
        title: "换车与补课费",
        board: "粉盔、电瓶车、哈弗",
        text: "走廊外传来熟悉的电瓶车铃声。安K戴着粉色头盔，耐克衣服被风吹得鼓起来。他拍了拍车座，又晃了晃表：“你们好好补课，老师也能早点换哈弗。”\n\n同学们先是沉默，随后有人低头算了一下：这辆车、那三块轮流上岗的表和补课费之间，似乎存在某种微妙的函数关系。",
        photo: "换车与补课费：粉色头盔下，是一套完整的商业模型。",
        choices: [
          { label: "假装没听见", next: "farewellQuote", effects: { mind: -5 }, item: "装备伏笔" },
          { label: "小声说：原来我们是车贷", next: "caught", effects: { mind: -8, dignity: -10 }, item: "换车吐槽" },
          { label: "记下这句话", next: "farewellQuote", effects: { dignity: 5 }, item: "换车语录" },
          { label: "把话咽回去，继续往前走", next: "finalCorridor", effects: { mind: -2 }, item: "温和毕业路线" }
        ]
      },
      resonance: {
        title: "共振效应",
        board: "楼会塌的",
        text: "课间操前，大家在楼道里乱哄哄地下楼。\n\n安K突然严肃起来：“都别一起跳！共振效应懂不懂？楼会塌的。”\n\n你看着这栋结实得像数学压轴题一样的教学楼，第一次觉得物理知识也可以被用来管理队伍。",
        photo: "共振效应：一句楼会塌的，让全班瞬间安静。",
        choices: [
          { label: "立刻放轻脚步", next: "photosynthesis", effects: { mind: -3, dignity: -2 } },
          { label: "问：老师，频率是多少", next: "office", effects: { mind: -10, dignity: -12 }, item: "共振追问" },
          { label: "偷偷记进奇妙物理论", next: "photosynthesis", effects: { mind: 2, dignity: 5 }, item: "共振笔记" }
        ]
      },
      photosynthesis: {
        title: "光合作用论",
        board: "下楼做操等于光合作用",
        text: "阳光很烈，大家都不想下楼做操。\n\n安K站在门口：“人也要光合作用。下去晒晒太阳，脑子才清醒。”\n\n你看了看自己，又看了看窗外，开始怀疑生物课是不是漏讲了什么重要章节。",
        photo: "光合作用论：下楼做操，从此有了生物学包装。",
        choices: [
          { label: "下楼晒太阳", next: "pkuCredit", effects: { mind: -4, dignity: -2 } },
          { label: "说：人不是植物", next: "caught", effects: { mind: -8, dignity: -10 }, item: "光合作用质疑" },
          { label: "把这句话写进语录本", next: "pkuCredit", effects: { dignity: 5 }, item: "光合作用语录" }
        ]
      },
      pkuCredit: {
        title: "北大学生的 80% 功劳",
        board: "成绩归因学",
        text: "某次班会，安K提起往届优秀学生：“那个考上北大的，80% 都是我的功劳。”\n\n全班沉默。你想起那位学长每天自习到很晚，又想起安K念答案的速度。\n\n这句话像一块奖牌，被他自己别在了自己胸口。",
        photo: "北大学生的 80% 功劳：成绩被重新分配。",
        choices: [
          { label: "鼓掌配合", next: "corridor", effects: { mind: -6, dignity: -4 } },
          { label: "翻白眼", next: "caught", effects: { dignity: -10 }, item: "班会白眼" },
          { label: "记入功劳分配表", next: "corridor", effects: { mind: 2, dignity: 6 }, item: "80%功劳记录" }
        ]
      },
      historySelfStudy: {
        title: "自习课讲历史",
        board: "三国与明朝那些事",
        text: "白天数学课，他常让大家自习。到了晚自习，本该安静做题，他却突然讲起历史。\n\n从三国讲到明朝，从帝王心术讲到班级管理。你看着没写完的卷子，感觉时间正在被一种很自信的方式消耗。\n\n同桌小声说：“白天不讲，晚上讲，晚上算补课。”你忽然明白了这套时间表。",
        photo: "自习课讲历史：题没做完，史倒是听了不少。",
        choices: [
          { label: "认真听，顺便记几个冷知识", next: "roast", effects: { mind: -6, dignity: 3 }, item: "历史冷知识" },
          { label: "偷偷写作业，别让他发现", next: "eveningTutor", effects: { mind: 5, dignity: -8 }, item: "晚自习草稿" },
          { label: "被点名后硬问历史细节", next: "office", effects: { mind: -8, dignity: -12 }, item: "历史追问" }
        ]
      },
      eveningTutor: {
        title: "晚自习补课",
        board: "一节十元，一次交一百",
        text: "几天后，晚自习又被安K占用了。\n\n白天那节正常数学课，他只让你们自习；到了晚上，他才把题拿出来讲。\n\n他站在讲台前，把一摞题拍在桌上：“晚自习我给你们补课，一节十块。不要一节一节交，这次先交一百，省得麻烦。”\n\n班里开始传钱。你看着桌洞里还没写完的作业，只能把练习册压在补课卷子下面，趁他转身晃表的时候偷偷写两行。\n\n金光扫过来，你立刻把笔停住。题没讲明白，作业也没写完，钱包却先少了一截。你终于确认：不是没有时间讲，是白天讲不收钱。",
        photo: "晚自习补课：讲台上补课，桌洞里赶作业。",
        choices: [
          { label: "交 100 元，继续偷写作业", next: "rankAfterExam", effects: { money: -100, mind: -4, dignity: -6 }, item: "晚自习补课缴费记录" },
          { label: "先欠着，说回家再拿", next: "callParents", effects: { mind: -8, dignity: -12 }, item: "晚自习补课欠费" },
          { label: "偷偷记下收费规则", next: "ally", effects: { mind: -3, dignity: 8 }, item: "证据flag：晚自习补课收费" }
        ]
      },
      officeQuestion: {
        title: "办公室问题",
        board: "我不会",
        text: "学生去办公室问题。安K接过卷子，先盯了几秒，然后把手机压在作业本下面偷偷拍题。\n\n小猿搜题转了半天，没有给出像样的答案。他又划了两下，最后小声说：“我不会。”\n\n空气突然很诚实，但也很尴尬。你站在门口，手里的题像一张沉默的证据。",
        photo: "办公室问题：不会可以说，但别把不会包装成规矩。",
        choices: [
          { label: "假装没听见，转身离开", next: "corridor", effects: { mind: -5, dignity: -2 } },
          { label: "追问：那我去问谁", next: "office", effects: { mind: -6, dignity: -10 }, item: "办公室追问" },
          { label: "出去跟同学说清楚", next: "bookConfiscation", effects: { mind: 4, dignity: 5 }, item: "不会记录" },
          { label: "去机房翻隐藏文件夹", next: "easterAlienNovel" }
        ]
      },
      rankAfterExam: {
        title: "考试后念排名",
        board: "态度有问题",
        text: "考试后，安K只念补课学生的进步。\n\n至于没补课的人，他轻描淡写地说：“态度有问题。”成绩单被念成了广告词，教室里没人敢笑。",
        photo: "考试后念排名：进步有名字，退步有态度。",
        choices: [
          { label: "沉默，把卷子翻过去", next: "corridor", effects: { mind: -8, dignity: -4 } },
          { label: "当场质疑：能不能看完整排名", next: "office", effects: { mind: -10, dignity: -18 }, item: "排名质疑" },
          { label: "发卷时遇到批卷收费", next: "gradingFee", effects: { mind: -3 }, item: "批卷收费预告" },
          { label: "补报补课，求个安稳", next: "fee", effects: { money: -50, dignity: -5 }, item: "补课意向" },
          { label: "下一节去数学竞赛课", next: "contestClass" },
          { label: "翻班级电脑里的QQ群文件", next: "easterPraise" }
        ]
      },
      hairCheck: {
        "title": "女生头发检查",
        "board": "头发也归数学管",
        "text": "安K扫了一眼女生头发：“女生头发过肩要扎，否则学不正经。”\n\n你看了看黑板：今天没讲函数，先讲发型。",
        "photo": "题目还没检查，头发先检查了。",
        "choices": [
          {
            "label": "遵守，不出声",
            "next": "seatByFee",
            "effects": {
              "mind": -5,
              "dignity": -5
            }
          },
          {
            "label": "反抗：头发扎起来，分数也能扎上去？",
            "next": "office",
            "effects": {
              "mind": -15,
              "dignity": -18
            },
            "item": "头发质疑"
          },
          {
            "label": "家长接回来时再说",
            "next": "parentComplaint",
            "effects": {
              "mind": 2,
              "dignity": 4
            },
            "item": "家长沟通计划"
          },
          {
            "label": "举手问：老师，那如果我喜欢的是别的班的呢？",
            "next": "office",
            "effects": {
              "mind": -10,
              "dignity": 14
            },
            "item": "别的班反问"
          },
          {
            "label": "后排稳龙突然笑了一声",
            "next": "longLaugh",
            "effects": {
              "mind": -3
            },
            "item": "稳龙课堂目击"
          },
          {
            "label": "晚上宿舍突然查寝",
            "next": "dormCheck",
            "effects": {
              "mind": -4
            },
            "item": "查寝预感"
          },
          {
            "label": "走廊尽头突然传来动静",
            "next": "kickOffice",
            "effects": {
              "mind": -4
            },
            "item": "办公室异响"
          }
        ]
      },
      dormCheck: {
        title: "半夜查寝",
        board: "不在床上就翻床",
        text: "半夜，宿舍走廊突然响起脚步声。\n\n安K推门进来查寝。他有一套固定逻辑：人在床上，算暂时安全；如果你不在床上，他就把你的床翻个底朝天，被子、书包、衣服全被掀开，像在搜什么重大证据。\n\n最怕的是夜里出去上厕所。门一响，他就能从走廊尽头冒出来：“你干什么去？”如果被他逮到，后颈立刻挨掌，piapia 两声，比熄灯铃还清楚。\n\n宿舍里没人敢笑，也没人敢解释。你第一次觉得，连上厕所都要先经过他的规矩。",
        photo: "半夜查寝：不在床上就翻床，夜里去厕所后颈 piapia。",
        choices: [
          { label: "立刻躺回床上装睡", next: "kickOffice", effects: { mind: -4 }, item: "查寝装睡记忆" },
          { label: "人不在床上，被翻了个底朝天", next: "kickOffice", effects: { mind: -12, dignity: -10 }, item: "床铺被翻记录" },
          { label: "夜里去厕所，被逮个正着", next: "kickOffice", effects: { mind: -15, dignity: -12 }, item: "查寝后颈挨掌记录" },
          { label: "从学校商店买个夜壶", next: "chamberPotResult", effects: { money: -12, mind: 2 }, item: "学校商店夜壶" },
          { label: "偷偷记下查寝时间", next: "kickOffice", effects: { mind: -6, dignity: 8 }, item: "宿舍查寝记录" }
        ]
      },
      chamberPotResult: {
        title: "学校商店夜壶",
        board: "违禁物品",
        text: "你从学校商店买了个夜壶，心想这下夜里不用出门上厕所了。\n\n半夜查寝时，安K一进门先看床，再看桌底，最后从床边把夜壶拎了出来。\n\n“这是什么？违禁物品？”他冷笑一声，晃了晃表，“哼~打脸了吧，把你脸打得 piapia 响。”\n\n全宿舍都醒着，却没人敢出声。你突然明白，在这间宿舍里，连解决生理问题都要先通过他的规矩。",
        photo: "学校商店夜壶：躲过厕所，躲不过查寝。",
        choices: [
          { label: "把夜壶收起来，继续熬", next: "kickOffice", effects: { mind: -10, dignity: -8 }, item: "违禁夜壶记录" },
          { label: "偷偷记下这句原话", next: "kickOffice", effects: { mind: -4, dignity: 8 }, item: "夜壶违禁原话记录" }
        ]
      },
      bookConfiscation: {
        title: "收缴课外书",
        board: "办公室书架",
        text: "安K没收小说和杂志，说会统一保管。\n\n后来有人在办公室看见那些书整整齐齐摆在他桌边，像是换了一个主人。",
        photo: "收缴课外书：书没消失，只是换了地方。",
        choices: [
          { label: "举报他看学生的书", next: "ally", effects: { mind: -4, dignity: 10 }, item: "课外书记录" },
          { label: "要回自己的书", next: "office", effects: { mind: -5, dignity: -8 }, item: "要书申请" },
          { label: "算了，不要了", next: "corridor", effects: { mind: -6, dignity: -6 } }
        ]
      },
      callParents: {
        title: "喊家长",
        board: "你不像地球人",
        text: "安K把学生家长叫来，当着家长的面说：“你家孩子不是地球人。”\n\n家长脸色难看，学生脸色更难看。你站在旁边，第一次觉得一句话能把人按进地里。",
        photo: "喊家长：一句不是地球人，变成公开处刑。",
        choices: [
          { label: "家长道歉，先结束场面", next: "parentComplaint", effects: { mind: -8, dignity: -10 } },
          { label: "家长对刚：请您注意措辞", next: "leaderCall", effects: { mind: 5, dignity: 12 }, item: "家长对话记录" },
          { label: "学生崩溃，什么也说不出", next: "parentComplaint", effects: { mind: -20, dignity: -15 } }
        ]
      },
      parentComplaint: {
        title: "课堂骂家长",
        board: "成年人能问这个？",
        text: "第二天上课，题还没讲几行，安K忽然开始骂家长。\n\n“有些家长，在路上碰见老师，连个招呼都不打。”他晃了晃表，像是在给这件事定性，“还有家长问我，孩子教室在四楼，上厕所不方便怎么办。你说这是一个成年人能问出的问题吗？”\n\n教室里没人接话。你听出来，他骂的不是某一个问题，而是所有敢把问题说出来的人。\n\n黑板上的题停在一半，粉笔灰落在讲台边。你知道，这节数学课又被拐到了别处。",
        photo: "课堂骂家长：题停在黑板上，话却绕到家长身上。",
        choices: [
          { label: "低头沉默，别把火引到自己身上", next: "corridor", effects: { mind: -8, dignity: -5 }, item: "家长被骂记忆" },
          { label: "偷偷记下这段话", next: "leaderCall", effects: { mind: -3, dignity: 7 }, item: "家长羞辱记录" },
          { label: "学生反击：问问题不丢人，骂家长才不合适", next: "leaderCall", effects: { mind: -10, dignity: 14 }, item: "替家长反击记录" }
        ]
      },
      contestClass: {
        title: "数学竞赛课",
        board: "45 分钟如何分配",
        text: "一节数学竞赛课，45 分钟里有 30 分钟自习，10 分钟安K低头用小猿搜题，最后 5 分钟把搜到的答案念了一遍。\n\n他每念到一道题，就晃一下表，像是在给答案盖章：“因为 a=b，所以 b=c，可是这样嘞！！！竞赛题啊，关键不在竞赛，关键在心态。你心态对了，答案自然就对；心态不对，我讲十遍也没用。”\n\n有人刚想追问中间那一步为什么能换元，他马上摆手：“这个地方先不要钻牛角尖，考试又不是让你写论文。你们自己体会。”随后猛地晃表，怒吼：“可是这样嘞！？”\n\n你数了数时间，发现真正讲题的部分短得像课间铃的回声。",
        photo: "数学竞赛课：自习很长，搜题很快，讲解很短。",
        choices: [
          { label: "睡觉，保存生命值", next: "pencil", effects: { mind: 4, dignity: -10 } },
          { label: "自学，把题补完", next: "rankAfterExam", effects: { mind: 8, dignity: 3 }, item: "竞赛自学笔记" },
          { label: "举手问：中间这步怎么来的", next: "contestQuestion", effects: { mind: -8, dignity: -6 }, item: "竞赛提问记录" }
        ]
      },
      contestQuestion: {
        title: "竞赛追问",
        board: "别钻牛角尖",
        text: "你举手问：“老师，中间这一步到底怎么换元的？”\n\n安K的表先晃了一下，金光从讲台边扫过去。他没有让你上台，也没有把推导补完，只是把粉笔在黑板上点了两下。\n\n“这个地方先不要钻牛角尖。”他说，“竞赛题看的是思维，不是让你抠每一个步骤。你们现在的问题就是太死板，我讲到这里你们应该会自己悟。”\n\n他把答案又念了一遍，声音比刚才大了一点。黑板上的关键步骤仍然空着，像被故意擦掉的一块。",
        photo: "竞赛追问：问题留在黑板上，答案留给自悟。",
        choices: [
          { label: "把空掉的步骤记下来", next: "rankAfterExam", effects: { mind: 3, dignity: 3 }, item: "竞赛换元疑问" },
          { label: "低头自己推完", next: "rankAfterExam", effects: { mind: 6, dignity: 2 }, item: "竞赛自救草稿" },
          { label: "不再追问", next: "pencil", effects: { mind: -4, dignity: -4 } }
        ]
      },
      seatShowoff: {
        title: "换座后的炫耀",
        board: "故意停在门口",
        text: "换座后，安K故意停在教室后门口，让学生看。\n\n他像在展示一项精心安排的工程。你分不清这是管理，还是一场小型展览。",
        photo: "换座后的炫耀：座位表也能成为表演。",
        choices: [
          { label: "沉默，看完这场展示", next: "lateCheck", effects: { mind: -5 } },
          { label: "小声议论，被骂", next: "caught", effects: { mind: -8, dignity: -10 } },
          { label: "拍照留存", next: "lateCheck", effects: { mind: -2, dignity: 6 }, item: "座位表照片" },
          { label: "摸摸最后一排课桌抽屉", next: "easterBiography" }
        ]
      },
      lateCheck: {
        title: "早读查迟到",
        board: "迟到一次 10 元",
        text: "早读门口，安K站得像收费站。\n\n“迟到一次罚 10 元。”他说。你摸了摸口袋，开始怀疑校门口是不是还缺一个扫码牌。",
        photo: "早读查迟到：迟到被折算成金额。",
        choices: [
          { label: "交钱，赶紧进去", next: "corridor", effects: { money: -10, dignity: -3 }, item: "迟到罚款" },
          { label: "硬扛：凭什么罚钱", next: "office", effects: { mind: -12, dignity: -15 }, item: "罚款质疑" },
          { label: "进班后撞上早自习听写", next: "dictationPunish", effects: { mind: -3 }, item: "早自习听写预告" },
          { label: "被推拉扯拽，记下经过", next: "pantsPull", effects: { mind: -15, dignity: -8 }, item: "门口经过记录" }
        ]
      },
      graduationBoast: {
        title: "毕业前的豪言",
        board: "最苦的一届",
        text: "高考前最后一节课，安K说：“你们是我带过最差的一届。”\n\n他停顿一下，又补一句：“也是最让我操心的一届。”有人翻白眼，有人提前离场。毕业的空气终于开始流动。",
        photo: "毕业前的豪言：最后一课，最后一次表演。",
        choices: [
          { label: "鼓掌，礼貌收场", next: "preFinalWeek", effects: { mind: 2, dignity: -2 } },
          { label: "翻白眼，被他看见", next: "preFinalWeek", effects: { mind: -5, dignity: 5 }, item: "最后白眼" },
          { label: "提前离场", next: "preFinalWeek", effects: { mind: 6, dignity: 8 }, item: "提前离场" }
        ]
      },
      longLaugh: {
        title: "他龙乱笑",
        board: "你可是有病",
        text: "数学课上，稳龙忍不住笑了一声。也许是同桌传纸条，也许是安K念答案念错了。\n\n安K反应极快，猛地拍桌：“胡稳龙！你可是有病？”\n\n全班瞬间安静，连粉笔灰都像停在了半空。",
        photo: "他龙乱笑：一声笑，被放大成课堂事故。",
        choices: [
          { label: "低头装作没听见", next: "corridor", effects: { mind: -5, dignity: -5 } },
          { label: "替稳龙说：老师，他只是笑不小心", next: "caught", effects: { mind: -7, dignity: -15 }, item: "替稳龙解释" },
          { label: "事后偷偷安慰稳龙", next: "corridor", effects: { mind: -5, dignity: -5 }, item: "稳龙好感" }
        ]
      },
      winterTutor: {
        title: "寒假补课报价",
        board: "过年卖一点",
        text: "寒假前一天，安K在班上公布补课安排。\n\n“过年的时候补课费，我让暑假贵一点。大过年的，老师不休息来给你们上课，你们心里没数吗？”\n\n他又补了一句：“我跟太和一中的老师聊天，人家都说假期不补课，那才不正常。”\n\n有人低头算钱，有人低头算命。",
        photo: "寒假补课：春节变成收费单位。",
        choices: [
          { label: "沉默交钱", next: "hotelTutor", effects: { money: -180, mind: -5, dignity: -10 }, item: "寒假补课收据" },
          { label: "小声说：大过年的也太离谱了", next: "hotelTutor", effects: { mind: -10, money: -180, dignity: -20 }, item: "寒假吐槽" },
          { label: "拒绝补课", next: "earth", effects: { mind: -20, dignity: -20 }, item: "寒假拒补" },
          { label: "录音保留证据", next: "hotelTutor", effects: { mind: -6, money: -180, dignity: -10 }, item: "证据flag：寒假补课录音" }
        ]
      },
      hotelTutor: {
        title: "暑假酒店补课：入住",
        board: "七个人一间双人房",
        text: "暑假补课第一天，你们被带到酒店。\n\n安K把七个人塞进一间双人床房，自己住单间。床边、地上、行李旁边都有人，空调声很轻，闷热却像从墙里往外冒。\n\n有人小声说：“这也太挤了。”门外脚步声一停，大家立刻安静。",
        photo: "酒店补课入住：七个人挤双人床房。",
        choices: [
          { label: "沉默接受", next: "hotelTutorClass", effects: { mind: -6, dignity: -5 }, item: "酒店补课入住记忆" },
          { label: "小声抱怨：这也太挤了", next: "hotelTutorClass", effects: { mind: -15, dignity: -10 }, item: "酒店住宿吐槽" },
          { label: "去找安K理论", next: "hotelTutorClass", effects: { mind: -20, dignity: -20 }, item: "酒店住宿质疑" }
        ]
      },
      hotelTutorClass: {
        title: "暑假酒店补课：上课",
        board: "标准间里的五十多人",
        text: "白天上课的“教室”也是普通酒店标准间。\n\n五十多人挤在一间屋里，桌椅不够，空气不够，连翻书都要小心碰到旁边人的胳膊。没有空调，窗户也只开了一条缝。\n\n安K站在最前面念答案，每讲一道题就晃一下表，反光从一排排汗湿的校服上扫过去：“胡稳龙，抬起你的头。你们要珍惜这个条件。xxx，你来讲下这题的思路。”\n\n学生讲到一半卡住，他立刻接管：“因为 a=b，所以 b=c，可是这样嘞！！！你看，这不是很简单吗？我跟你们讲，题目难不难不重要，重要的是你们有没有感恩的心。老师牺牲暑假给你们讲，钱只是一个形式，态度才是根本。”\n\n你坐在后面，汗流浃背，发现他讲到最难的一步时又把题跳过去了。下一秒，他忽然冲着全班怒吼：“可是这样嘞！？”",
        photo: "酒店补课上课：五十多人挤在标准间。",
        choices: [
          { label: "忍着听课", next: "hotelTutorRoomCheck", effects: { mind: -5 }, item: "酒店补课记忆" },
          { label: "走神发呆", next: "hotelTutorRoomCheck", effects: { mind: -5, dignity: -5 }, item: "酒店补课麻木感" },
          { label: "偷偷扇风", next: "hotelTutorRoomCheck", effects: { mind: -5 }, item: "暑假闷热记忆" }
        ]
      },
      hotelTutorRoomCheck: {
        title: "暑假酒店补课：查房",
        board: "通用房卡",
        text: "晚上，走廊突然传来刷卡声。\n\n安K手里有通用房卡，随时可以推门进来查房。你听到走廊里的脚步声，心跳加速，房间里七个人同时屏住呼吸。\n\n那一刻，你分不清这是补课、住宿，还是另一种形式的点名。",
        photo: "酒店补课查房：脚步声比闹钟更准。",
        choices: [
          { label: "假装睡熟", next: "hotelTutorSettle" },
          { label: "坐起来假装看书", next: "hotelTutorSettle", effects: { dignity: 5 }, item: "查房读书姿势" },
          { label: "躲在厕所", next: "hotelTutorSettle", effects: { mind: -5 }, item: "查房惊吓" }
        ]
      },
      hotelTutorSettle: {
        title: "暑假酒店补课：结算",
        board: "回家的账",
        text: "二十天补课结束，你坐在回家的车上算了一笔账。\n\n补课费、住宿费之外，酒店不包餐饮。中午和晚上还得自己去周围买饭，矿泉水、盒饭、面包、公交钱，一天一天加起来，也变成一串很吓人的数字。\n\n有人说自己一共交了两千多，也有人说家里已经不想再问细账。\n\n游戏里不会一次扣掉 2000，但这次暑假补课仍然要从钱包里扣掉 200。现实里的那笔账，还会被记成另一种东西：理智和尊严的损耗。\n\n窗外风景倒退，你没有说话。",
        photo: "酒店补课结算：钱是一笔账，记忆是另一笔账。",
        choices: [
          { label: "交完暑假补课和吃饭费用，把总账记下来", next: "giftWatch", effects: { money: -200, mind: -10, dignity: 6 }, item: "证据flag：酒店补课总账" },
          { label: "交完暑假补课和吃饭费用，忍着不再提", next: "giftWatch", effects: { money: -200, mind: -8, dignity: -10 }, item: "酒店补课沉默" },
          { label: "交完暑假补课和吃饭费用，和同学互相确认细节", next: "giftWatch", effects: { money: -200, mind: -6, dignity: 10 }, item: "酒店补课同学证词" }
        ]
      },
      giftWatch: {
        title: "补课表礼",
        board: "不知道给老师买点礼物吗",
        text: "寒假补课期间，安K在课间摸了摸手腕。\n\n“你们不知道给老师买点礼物吗？你看隔壁班，人家学生多懂事。”\n\n你顺着他的目光看向那块表，突然觉得这句话的主语和宾语都很明确。",
        photo: "补课表礼：礼物不是明说，但方向很清楚。",
        choices: [
          { label: "第二天凑钱买礼物", next: "corridor", effects: { money: -30, mind: -8, dignity: 10 }, item: "礼物清单" },
          { label: "当作没听见", next: "corridor", effects: { mind: -8, dignity: -10 } },
          { label: "举手说：老师，补课费我们已经交了", next: "office", effects: { mind: -15, dignity: -20 }, item: "礼物质疑" },
          { label: "私下跟同学吐槽一波", next: "corridor", effects: { mind: -8, dignity: -15 }, item: "举报flag：补课表礼" }
        ]
      },
      longSleep: {
        title: "稳龙上课睡觉",
        board: "安K动手",
        text: "下午第一节课，稳龙趴在桌上睡着了。\n\n安K走过去，先抬起手掌拍稳龙后颈，piapia 两声，声音在教室里特别响：“安些许。”稳龙没醒。他又拍了一下，像是很熟练地知道哪里最容易把人惊醒。\n\n你忽然意识到，这几乎成了他的固定动作：梓豪被骂，后颈挨掌；作业没写完，后颈挨掌；稳龙睡着了，还是后颈挨掌。\n\n然后他用力拉扯胳膊，把稳龙从座位上拽起来。\n\n“我上课你睡觉？你可坐稳？”",
        photo: "稳龙上课睡觉：后颈挨掌，piapia 响成了固定动作。",
        choices: [
          { label: "沉默旁观", next: "corridor", effects: { mind: -10, dignity: -5 } },
          { label: "小声说：别打了", next: "caught", effects: { mind: -15, dignity: -15 }, item: "替稳龙出声" },
          { label: "下课后陪稳龙去医务室", next: "corridor", effects: { mind: -10, dignity: -5 }, item: "医务室记录" },
          { label: "用手机录下来", next: "corridor", effects: { mind: -10, dignity: -5 }, item: "录音证据：稳龙课堂录像" },
          { label: "深夜刷到一条QQ空间动态", next: "easterMagic" }
        ]
      },
      farewellQuote: {
        title: "安K的寄语",
        board: "高考前的感恩课",
        text: "临近高考，安K站在讲台前长篇讲话。\n\n他先抬起左手晃表，金光在黑板边缘跳了一下，像给这场讲话打了开场灯。今天轮到第二块金表，前两天分别是银表和另一块金表，同学们已经能按反光颜色判断日期。\n\n“抬头。”他说，“我跟你们讲，做人要懂得感恩。你们能走到今天，靠的是谁？老师天天盯着你们，补课、看班、管纪律、讲答案，哪一样不是为了你们好？”\n\n他顿了顿，又晃了一下表：“以后考出去了，别觉得都是你们自己厉害。没有老师在后面推着，你们能有今天？可懂一点规矩？”\n\n全班看着那块表反光扫过讲台，没人知道该点头，还是该低头。\n\n有同学私下统计过，他一学期换过的运动鞋数量，比你们知道的数学平均分还高。这段话终于能听懂几句，但那股气势还是熟悉得很。",
        photo: "毕业寄语：语句越乱，气势越满。",
        choices: [
          { label: "无反应，一天光阴", next: "corridor", effects: { mind: -6 } },
          { label: "小声说：又绕晕了", next: "caught", effects: { dignity: -5 }, item: "毕业寄语吐槽" },
          { label: "认真鼓掌：老师，您这格局真有品位", next: "corridor", effects: { dignity: 5, mind: -3 }, item: "体面掌声" },
          { label: "私下统计他的鞋和表", next: "graduationBoast", effects: { mind: -3, dignity: 5 }, item: "彩蛋解锁：装备统计表" },
          { label: "刷到QQ空间表白墙", next: "easterLoveLetter" }
        ]
      },
      preFinalWeek: {
        title: "期末前一周",
        board: "还没到结算",
        text: "你以为这学期终于要结束了，结果期末前一周反而更密集。\n\n班级群里有人补充收费记录，有人整理被骂的原话，还有人翻出学长留下的旧文件。安K照旧晃表，金光从黑板边缘扫过去，像在催促所有人赶紧忘掉。\n\n但这一次，你可以选择再多走一步。",
        photo: "期末前一周：结算前，还有几条线能补完。",
        choices: [
          { label: "整理监考费和补课费材料", next: "ally", effects: { mind: 4, dignity: 6 }, item: "期末补充材料" },
          { label: "翻班级群旧文件", next: "easterAnnualPerson" },
          { label: "最后一次去走廊看看", next: "finalCorridor", effects: { mind: 2 } },
          { label: "准备好面对期末谈话", next: "termDecision" }
        ]
      },
      finalCorridor: {
        title: "最后一次走廊",
        board: "铃声之后",
        text: "最后一次课间，你站在走廊尽头。\n\n粉色头盔、电瓶车铃、耐克袖口、晃表反光，一样不少。只是这次你身边多了几个同学，大家没有大声说话，却都知道彼此记得什么。\n\n期末谈话快到了，但你已经不是刚开学那个只会低头的人。",
        photo: "最后一次走廊：同样的走廊，不同的人。",
        choices: [
          { label: "和同学交换最后一份记录", next: "ally", effects: { mind: 3, dignity: 5 }, item: "最后一份记录" },
          { label: "去机房看看有没有学长遗迹", next: "easterAlienNovel" },
          { label: "进入期末决断", next: "termDecision" }
        ]
      },
      termDecision: {
        title: "期末决断",
        board: "下学期你看着办",
        text: "期末前，安K找你谈话。\n\n“你这一学期表现不错。”他停顿一下，金表贴着桌面轻轻一响，“但补课费还差几次没交。下学期……你看着办。”\n\n这不是普通对话，而是影响结局的关键节点。下面带“结算结局”的选择会直接进入最终结局，你这一学期留下的状态、钱、尊严和证据，会在这里一起结算。",
        photo: "期末决断：一句“你看着办”，把整学期的选择都推到你面前。",
        choices: [
          { label: "结算结局：低头说我下学期补上", action: "graduate", effects: { dignity: -20 } },
          { label: "结算结局：请您给出收费依据", action: "graduate", effects: { dignity: 10, mind: 5 }, item: "期末质询" },
          { label: "结算结局：整理材料和同学一起反馈", action: "graduate", effects: { dignity: 12, mind: 8 }, item: "期末材料包" },
          { label: "先翻班级群网盘", next: "easterAnnualPerson" }
        ]
      },
      ally: {
        title: "同学开始抬头",
        board: "集体行动题",
        text: "你没有逞英雄，而是把记录、疑问和同学的经历整理到一起。\n\n越来越多人愿意补充细节。有人说：“原来不是我一个人觉得不对劲。”\n\n安K还在晃表，金光还是刺眼，但它第一次没那么吓人。",
        choices: [
          { label: "提交给年级和家长代表", next: "review", effects: { mind: 6, dignity: 10 }, item: "联合反馈" },
          { label: "继续单独硬刚", next: "office", effects: { mind: -12, dignity: -12 } },
          { label: "先稳住，等更多材料", next: "corridor", effects: { mind: 5, dignity: 3 } }
        ]
      },
      review: {
        title: "期末审查",
        board: "请说明情况",
        text: "年级组终于开始了解情况。你们提交的材料不夸张、不添油，只按时间线排列。\n\n安K被要求暂停私下收费，班会也换成了真正的答疑课。\n\n这不是爽文式胜利，但你们终于把教室里的空气换了一遍。",
        ending: "good",
        choices: [
          { label: "查看本局评价", next: "finalGood" }
        ]
      },
      finalGood: {
        title: "结局：抬头的人",
        board: "结局 A",
        text: "你保住了理智，也保住了一部分尊严。最重要的是，你学会了把情绪变成证据，把孤立变成互相照应。\n\n他还会晃表发光，但你已经知道：刺眼的东西，不一定代表正确。",
        ending: "good",
        choices: [
          { label: "再玩一次", action: "reset" }
        ]
      },
      finalEarth: {
        title: "结局：地球人",
        board: "优先级 8",
        text: "你顺利毕业，考上了大学。毕业那天，你删掉了安K的微信。\n\n多年后你想起他，只觉得一阵恶心，然后继续生活。你没有变成他那样的人。",
        ending: "good",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalShake: {
        title: "结局：摇表人",
        board: "优先级 3",
        text: "你被彻底驯服了。你学会了抬头看他晃表、按时交补课费、从不问为什么。\n\n你考上了一个普通大学，后来你也当了老师。有一天你发现自己也开始念答案了。",
        ending: "bad",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalCharm: {
        title: "结局：魅力走位",
        board: "结局 C",
        text: "你全程和他对着干，但没被抓到把柄。\n\n毕业那天，你在 QQ 空间发了长文，列举他的十二大罪状。他找你爸谈话，你爸让你删掉。你删了，但备份还在。",
        ending: "weird",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalDayday: {
        title: "隐藏结局：天道轮回",
        board: "优先级 4",
        text: "你把安K的事迹整理成文档，连同录音、照片、聊天记录和匿名材料，一起交给教育局和多家媒体。\n\n这一次，检举没有被压下去。材料被一层层核实，那些被骂过、被打过、被收费压过的学生终于有人认真听见。一个月后，安K被调离并接受处理，班里恢复了正常上课。\n\n你坐在大学宿舍里，收到同学的消息：“他走了，正义终于伸张了一点。”\n\n你没有大喊大叫，只是长长地松了一口气，把那个文件夹移到了硬盘深处。",
        ending: "weird",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalMirror: {
        title: "结局：镜子",
        board: "优先级 6",
        text: "毕业多年后，你回成角中学办事，在走廊上遇见一个年轻老师。\n\n他戴着普通的手表，穿着普通的衣服，正在批评学生排队一步一停、从不抬头。\n\n你恍惚听到了自己的声音。你突然明白：安K不是你的终点，而是你的镜子。\n\n你终于知道，自己不能成为这样的人。",
        ending: "weird",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalThroat: {
        title: "结局：骚粉骑士的葬礼",
        board: "优先级 7",
        text: "很多年后，你听说安K退休了。你没有任何感觉，但你做了一个梦。\n\n梦里他骑着那辆骚粉色电瓶车，绕着操场一圈又一圈，金表反光像一串荒唐的尾灯。全班站在远处，没有人鼓掌，没有人抬头。\n\n车越骑越慢，最后停在一张旧课桌旁。桌面上只有一行字：安K，别脏了。",
        ending: "weird",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalBadMind: {
        title: "结局：不是地球人",
        board: "优先级 2",
        text: "某天安K当众说：“我看你分分钟都不是地球人。”\n\n你开始怀疑自己。你变得沉默、麻木、不再提问。毕业多年后，你仍然记得那块表的反光，却不知道自己当时到底是怎么活下来的。",
        ending: "bad",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalBadMoney: {
        title: "结局：负债退学",
        board: "优先级 1",
        text: "安K堵在教室门口：“补课费都交不起，还上什么学？”\n\n你被要求叫家长，最终你选择了转学。身后的教室里传来安K的声音：“哎，可惜一点规矩都没有。”",
        ending: "bad",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalBadDignity: {
        title: "结局：自动低头",
        board: "结局 D",
        text: "尊严归零。每次他一晃表、金光一闪，你都会提前把头低下。\n\n不过模拟器允许重来。现实里更难，所以更要保护好自己和身边的人。",
        ending: "bad",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      finalWeird: {
        title: "隐藏结局：表盘雷达专家",
        board: "结局 S",
        text: "你收集了足够多的金表反光数据，成功预测安K每一次发火前摇。\n\n全班靠你的手势躲过三次点名。你被尊称为“光学课代表”。",
        ending: "weird",
        choices: [
          { label: "重新开局", action: "reset" }
        ]
      },
      seniorBlessing: {
        title: "隐藏终章：学长的寄语",
        board: "给后来的人",
        text: "给学弟学妹的寄语\n\n亲爱的学弟学妹：\n\n如果你打开了这款游戏，走完了主要结局线——地球人、摇表人、魅力走位、天道轮回、不是地球人、负债退学、自动低头、骚粉骑士的葬礼、抬头的人——那么我想以这些作品的创作者的身份，对你说几句话。\n\n第一句：你没有错。\n你上课抬头了，但你看的是黑板，不是他的表。\n你交补课费了，但你心里一直觉得不对。\n你被他骂“你可蠢”“滚你娘嘞”“你可是地球人”，你生气、委屈、觉得自己是不是真的有问题。\n\n你没有问题。\n有问题的是那个站在讲台上、口袋里装着你的钱、手腕上晃着金表、连一道导数题都讲不清楚的人。\n\n第二句：你不是一个人。\n这些作品，全是我一个人写的。但里面每一个细节——金表、粉盔、安K拳、酒店补课、监考费咆哮、“你可讲理”“你可是地球人”——不是我编的，是我们那一届所有人一起经历的。\n\n我不是“学长代表”。我只是那个把大家的记忆写成文字的人。\n你经历的，我也经历过。你不孤独，我也不孤独。\n\n第三句：你可以不原谅，但一定要走出来。\n毕业那天，我删掉了他的微信。\n不是我原谅了他，是我决定不再让他占我的内存。\n\n你以后会考上大学、读研、工作、结婚、生子。\n你会遇见真正的老师——那些备课到深夜、批作业到凌晨、会因为你考好了而发自内心高兴的人。\n你会发现，安K那样的东西，不配叫“老师”。\n你会发现，你当年受过的那些委屈，不是你的错，也不是你的命。\n\n你可以恨他。\n但不要让他定义你的一生。\n\n第四句：如果你有能力，不要让下一个“安K”继续站在讲台上。\n我知道，举报很难。\n家长会说“多一事不如少一事”，学校会保他，教育局未必管，甚至你自己都会犹豫——“我真的要毁掉一个人的工作吗？”\n\n但我想告诉你：毁掉教育的不是举报的人，是那些站在讲台上却不配的人。\n\n如果你有能力、有证据、有勇气，去做你觉得对的事。\n如果你没有，也没关系。保护好自己，先活下去。\n但请记住：沉默是一种选择，不是一种义务。\n\n第五句：我们赢了。\n不是我们举报了他、打败了他。\n是我们没有变成他。\n\n我们没有变成那种收钱不办事、念答案不讲课、打学生不脸红的人。\n我们走过那条走廊，推开那扇门，坐在那个50多人的酒店标准间里，熬过了那个暑假。\n我们活着出来了。\n我们考上了大学。\n我们读了研。\n我们还在写段子、写小说、做游戏，把他的名字钉在每一个能看见的地方。\n\n他还在晃他的表，但我们再也不会抬头了。\n\n你的学长\n若朝",
        photo: "学长寄语：不是所有故事都要停在那间教室里。",
        ending: "good",
        choices: [
          { label: "带着这句话重新开局", action: "reset" }
        ]
      },
      headUpRule: {
        "title": "抬头！",
        "board": "笔记先别写",
        "text": "你刚低头补上一行笔记，安K就敲了敲讲台：“抬头！我讲课你们低什么头？”\n\n全班望过去。他自己却低着头，拇指还在手机屏幕上划。",
        "photo": "全班抬头，讲台上却有人低头。",
        "choices": [
          {
            "label": "抬头，先把笔放下",
            "next": "distanceRule",
            "effects": {
              "mind": -2,
              "dignity": -2
            }
          },
          {
            "label": "小声说：笔记靠脑补了",
            "next": "distanceRule",
            "effects": {
              "mind": 2,
              "dignity": -3
            }
          },
          {
            "label": "举手：您看手机也算低头吗？",
            "next": "headUpReply",
            "effects": {
              "mind": -4,
              "dignity": 8
            },
            "item": "抬头反击记录"
          }
        ]
      },
      headUpReply: {
        "title": "抬头提问",
        "board": "手机先收一收",
        "text": "安K把手机往讲台里一收：“聪明可以，但不要自以为聪明。”\n\n你刚抬起头，他又低头看了眼手机。",
        "choices": [
          {
            "label": "听听下一条规矩",
            "next": "distanceRule"
          }
        ]
      },
      distanceRule: {
        "title": "一米安全距离",
        "board": "同桌变远桌",
        "text": "“男女之间保持一米的安全距离！”\n\n你看了看同桌，又看了看这张半米多宽的课桌。椅子再往外挪，就要坐进过道了。",
        "photo": "安全距离够了，过道没了。",
        "choices": [
          {
            "label": "把椅子挪进过道",
            "next": "romanceRule",
            "effects": {
              "mind": -2,
              "dignity": -2
            }
          },
          {
            "label": "小声说：同桌变远桌了",
            "next": "romanceRule",
            "effects": {
              "mind": 2,
              "dignity": -3
            }
          },
          {
            "label": "举手：老师，先罚这张桌子？",
            "next": "distanceReply",
            "effects": {
              "mind": -4,
              "dignity": 8
            },
            "item": "一米规则记录"
          }
        ]
      },
      distanceReply: {
        "title": "先罚桌子？",
        "board": "人挪，桌子不挪",
        "text": "安K看了看桌子：“人挪！谁叫你管桌子？”\n\n你把椅子挪进过道。他走过来，又嫌你挡了路。",
        "choices": [
          {
            "label": "继续听班会",
            "next": "romanceRule"
          }
        ]
      },
      romanceRule: {
        "title": "谈恋爱是乱伦？",
        "board": "花名册变家谱",
        "text": "“你们在一个班里，就像兄弟姐妹一样。跟兄弟姐妹谈恋爱，那不叫乱伦吗？”\n\n你看了看花名册。开学才几天，亲戚倒是一下多了几十个。",
        "photo": "刚进班，先认亲。",
        "choices": [
          {
            "label": "点头，先认下这门亲戚",
            "next": "afterFirstExam",
            "effects": {
              "mind": -2,
              "dignity": -2
            }
          },
          {
            "label": "小声说：花名册变家谱了",
            "next": "afterFirstExam",
            "effects": {
              "mind": 2,
              "dignity": -3
            }
          },
          {
            "label": "举手：转班能解除亲属关系吗？",
            "next": "romanceReply",
            "effects": {
              "mind": -4,
              "dignity": 8
            },
            "item": "转班亲属关系疑问"
          }
        ]
      },
      romanceReply: {
        "title": "转班能退亲吗？",
        "board": "问那么多干什么",
        "text": "安K停了两秒：“问那么多干什么？”\n\n你收起转班申请。原来这门亲戚，只能认，不能退。",
        "choices": [
          {
            "label": "熬到第一次月考",
            "next": "afterFirstExam"
          }
        ]
      },
    };

    const globalCompletionEndingIds = [
      "finalEarth",
      "finalShake",
      "finalCharm",
      "finalDayday",
      "finalBadMind",
      "finalBadMoney",
      "finalBadDignity",
      "finalThroat"
    ];

function graduationEnding() {
      updateAchievements();
      const evidenceItems = state.items.filter((item) => /安K|稳龙|梓豪|录音|录像|证据|记录|材料|反馈|质询/.test(item)).length;
      const knightItems = state.items.filter((item) => /粉盔|电瓶车|骚粉|安K拳|推拉扯|稳龙|梓豪|医务室|他龙/.test(item)).length;
      const askedForBasis = state.items.some((item) => /期末质询/.test(item));
      const hasFormalReport = state.items.some((item) => /期末材料包|联合反馈|举报flag|录音证据/.test(item));
      const hasStrongEvidence = hasKeyEvidence() && (state.evidence >= 6 || evidenceItems >= 5);
      const hasEvidenceBurst = hasFormalReport || (hasStrongEvidence && state.rebuttals >= 3);
      const hasCharmMarker = state.items.some((item) => /期末质询|收费依据|反击|质疑|勇气|提前离场|最后白眼|双表|当场补充事实/.test(item));
      const hasCharmSeed = (askedForBasis && state.rebuttals >= 3 && state.dignity >= 55) || (hasCharmMarker && state.rebuttals >= 3 && state.dignity >= 55);
      const hasStableEarthSeed = !askedForBasis && !hasFormalReport && state.rebuttals <= 2 && state.mind >= 55 && state.money >= 100 && state.dignity >= 50;
      const hasMirrorSeed = (state.glare >= 5 && state.paidTimes >= 2) || (state.paidTimes >= 3 && state.scolded >= 3);
      const hasSubmissionSeed = state.rebuttals <= 1 && (
        (state.paidTimes >= 4 && state.dignity <= 70) ||
        (state.paidTimes >= 3 && state.dignity <= 55 && state.mind <= 65)
      );
      const hasThroatSeed = state.rebuttals <= 2 && (
        (knightItems >= 3 && state.scolded >= 4) ||
        (knightItems >= 2 && state.corridorHelmet >= 3 && state.scolded >= 3)
      );
      if (state.money <= 40 || (state.money <= 120 && state.paidTimes >= 3)) return "finalBadMoney";
      if (hasSubmissionSeed) return "finalShake";
      if (state.mind <= 25 || (state.mind <= 45 && state.scolded >= 7 && state.paidTimes < 2)) return "finalBadMind";
      if (hasEvidenceBurst) return "finalDayday";
      if (hasThroatSeed) return "finalThroat";
      if (hasStableEarthSeed) return "finalEarth";
      if (hasCharmSeed) return "finalCharm";
      if (state.rebuttals >= 3 && state.dignity >= 45 && state.money <= 180) return "finalCharm";
      if (hasMirrorSeed) return "finalMirror";
      if (state.dignity <= 45) return "finalBadDignity";
      if (state.paidTimes >= 3 && state.rebuttals <= 1 && state.dignity <= 55) return "finalShake";
      if (state.rebuttals >= 3 && state.dignity >= 50) return "finalCharm";
      if (state.mind >= 65 && state.money >= 100 && state.dignity >= 55) return "finalEarth";
      return "finalEarth";
    }
