/* Campus Desk bilingual interface. English is the original content; Chinese is added in place. */
(() => {
    "use strict";
    const STORAGE_KEY = "campusDeskLanguage";
    const zh = {
        "Home | Campus Desk": "首页 | Campus Desk",
        "Study Shelf | Campus Desk": "学习书架 | Campus Desk",
        "Loadout | Campus Desk": "校园书包 | Campus Desk",
        "Active Breaks | Campus Desk": "课间活动 | Campus Desk",
        "Contact | Campus Desk": "联系我 | Campus Desk",
        "Skip to main content": "跳转到主要内容",
        "Campus Desk home": "Campus Desk 首页",
        "Primary navigation": "主导航",
        "Explore Campus Desk": "探索 Campus Desk",
        "Go to page footer": "跳转到页脚",
        "Home": "首页",
        "Study Shelf": "学习书架",
        "Loadout": "书包整理",
        "Active Breaks": "课间活动",
        "Contact": "联系我",
        "Built by X20250020 · Web Technologies 2026": "X20250020 制作 · Web Technologies 2026",
        "Your campus, your next move. A digital desk for university study, everyday preparation and active breaks.": "你的校园，你准备好了吗！ 一个帮助大学生日常学习、出门准备和课间活动的数字空间。",
        "Reliable study resources and class notes for university students.": "面向大学生的阅读资源和整理课堂笔记的书架。",
        "Build a practical backpack loadout for a day on campus.": "为校园里的一天整理实用的书包物品。",
        "Find a practical campus activity that fits your time, space, equipment and preferences.": "按照时间、场地、器材和个人喜好，寻找合适的校园运动。",
        "Contact the creator of Campus Desk.": "联系 Campus Desk 的作者。",
        "Sunlit modern campus buildings and green lawns surrounding a central pedestrian walkway.": "阳光下的现代校园建筑、草坪和步道。",
        "Meet the campus students": "认识校园里的同学",
        "Say hello to a student. Hover, tap, or drag a student.": "和同学打个招呼。悬停、点击或拖动小人。",
        "Say hello to a campus student": "和校园里的同学打招呼",
        "Let’s connect": "联系我",
        "Say hello!": "打个招呼！",
        "Hover or tap a student · Drag to move": "移动鼠标 · 点击小人 · 拖动小人",
        "Your campus,": "你的校园",
        "your next move.": "你准备好了吗！",
        "Study smarter. Get ready. Stay active.": "高效学习，做好准备，保持活力。",
        "Find your space": "探索校园",
        "A little clarity": "让思路更清晰",
        "Read · Write · Focus": "阅读 · 记录 · 专注",
        "Ready for the day": "准备好出门",
        "Campus Loadout": "校园书包",
        "Pack · Check · Go": "整理 · 检查 · 出发",
        "Make room to move": "留点时间运动",
        "Move · Reset · Recharge": "运动 · 放松 · 充电",
        "A fresh perspective. Every day.": "每天都有新的视角。",
        "Hi there! 👋": "你好呀！👋",
        "How are you today?": "今天过得怎么样？",
        "How’s the weather?": "今天天气怎么样？",
        "Having a good day?": "今天顺利吗？",
        "Nice to see you!": "很高兴见到你！",
        "Take a little break ☀": "休息一会儿吧 ☀",
        "You’ve got this!": "你可以的！",
        "Ready for a fresh start?": "准备好重新出发了吗？",

        "Read. Capture. Return.": "阅读 · 记录 · 回顾",
        "A calm place to discover reliable reading, collect class notes and return to ideas worth keeping.": "在安静的角落发现值得读的内容，整理课堂笔记，随时回顾有价值的想法。",
        "Pick a book, choose a notebook and keep one useful idea before you leave.": "选一本书，打开一本笔记本，离开前记下一条有用的想法。",
        "Open a door": "打开一扇门",
        "Reading Shelf": "阅读书架",
        "Free classics and trusted places to begin your research.": "从免费经典读物和可靠网站开始探索。",
        "Study websites": "图书与文献网站",
        "Click a book to search books and articles.": "点击下方书本，搜索书籍和文献。",
        "Three-tier reading bookcase": "三层阅读书架",
        "Three-tier notebook bookcase": "三层笔记本书架",
        "Project": "古登堡",
        "Gutenberg": "计划",
        "Standard": "标准",
        "Ebooks": "电子书",
        "Google": "谷歌",
        "Scholar": "学术",
        "DOAJ": "DOAJ",
        "Open": "开放",
        "Library": "图书馆",
        "Internet": "互联网",
        "Archive": "档案馆",
        "Common reads": "经典读物",
        "Pride &": "傲慢与",
        "Prejudice": "偏见",
        "Jane Austen": "简·奥斯汀",
        "Frankenstein": "弗兰肯斯坦",
        "Mary Shelley": "玛丽·雪莱",
        "Sherlock": "福尔摩斯",
        "Holmes": "探案集",
        "A. C. Doyle": "柯南·道尔",
        "Alice in": "爱丽丝",
        "Wonderland": "漫游仙境",
        "Lewis Carroll": "刘易斯·卡罗尔",
        "Dracula": "德古拉",
        "Bram Stoker": "布莱姆·斯托克",
        "Jane Eyre": "简·爱",
        "C. Brontë": "夏洛蒂·勃朗特",
        "Moby Dick": "白鲸",
        "H. Melville": "赫尔曼·梅尔维尔",
        "The Great": "了不起的",
        "Gatsby": "盖茨比",
        "F. Fitzgerald": "菲茨杰拉德",
        "Read a book, explore a catalogue, or search for something you want to read.": "读一本书，浏览书目，也可以搜索你想看的内容。",
        "Keep the thought": "留住灵感",
        "My Notes": "我的笔记",
        "Choose a notebook, write a clear note and save it to your shelf.": "选一本笔记本，写下想法，保存到书架。",
        "A new place for ideas": "给灵感一个新位置",
        "Create a notebook": "新建笔记本",
        "Create your own notebook": "创建自己的笔记本",
        "Record your own ideas, one page at a time.": "一页一页地记录你的想法。",
        "Notebook name": "笔记本名称",
        "Cover colour": "封面颜色",
        "Plum": "梅紫",
        "Teal": "青绿",
        "Clay": "陶土色",
        "Taupe": "灰褐色",
        "Notebook open": "笔记本已打开",
        "Notebook": "笔记本",
        "Add notebook": "添加笔记本",
        "Add a new notebook": "添加一本新笔记本",
        "Notebook shelf tip": "笔记书架提示",
        "Delete notebook": "删除笔记本",
        "Close book": "合上书本",
        "Pen colour": "笔的颜色",
        "Left page selected": "已选中左页",
        "Right page selected": "已选中右页",
        "Copy page": "复制本页",
        "Download": "下载",
        "Saved automatically.": "已自动保存。",
        "Both pages are saved.": "两页都已保存。",
        "Keep a downloaded copy of this page.": "请下载本页留存副本。",
        "Browser storage is unavailable. Download the page to keep it.": "浏览器无法保存，请下载本页留存。",
        "0 words": "0 字/词",
        "Left page title": "左页标题",
        "Left page notes": "左页笔记",
        "Right page title": "右页标题",
        "Right page notes": "右页笔记",
        "← Previous pages": "← 上两页",
        "Next pages →": "下两页 →",
        "← Previous": "← 上一页",
        "Next →": "下一页 →",
        "Delete this notebook?": "确定删除这本笔记本吗？",
        "Its pages will be removed from this browser. This cannot be undone.": "此浏览器中该笔记本的所有页面都会删除，且无法撤销。",
        "Keep it": "保留",
        "Untitled page": "未命名页面",
        "A clean page waiting for the next idea.": "空白的一页，等待你的下一个想法。",
        "A notebook with this name already exists.": "已经有同名笔记本了。",
        "Pen colour changed.": "笔的颜色已更改。",
        "There is no text to copy yet.": "这一页还没有可复制的文字。",
        "Selected page copied.": "已复制选中的页面。",
        "Copy was blocked. Select the text and copy it manually.": "复制失败，请手动选中文字复制。",
        "Selected page downloaded.": "已下载选中的页面。",
        "Mathematics": "数学", "Physics": "物理", "Design": "设计", "Literature": "文学", "Biology": "生物",
        "Economics": "经济学", "History": "历史", "Research": "研究", "Campus Life": "校园生活",
        "Projects": "项目", "Languages": "语言", "Ideas": "想法", "Writing": "写作",
        "Planning": "计划", "Reading": "阅读", "Science": "科学", "Culture": "文化", "Journal": "日记",
        "Web": "网页", "Technology": "技术", "Web Technology": "网页技术", "Git &": "Git 与", "Git & GitHub": "Git 与 GitHub",
        "German": "德语", "Language": "语言", "Personal": "个人", "Notes": "笔记", "Personal Notes": "个人笔记"
    };
    Object.assign(zh, {
        "Prepare for your day": "为今天做好准备",
        "Tell us about your day on campus and build a practical backpack loadout before leaving home.": "告诉我们今天的校园安排，出门前整理一份实用的书包清单。",
        "Step 1 · Make your choices": "第一步 · 做出选择",
        "Plan your campus day": "规划校园的一天",
        "A few quick choices are all your backpack needs.": "回答几个简单问题，就能知道书包该装什么。",
        "How many classes do you have?": "今天有几节课？",
        "We will add one paper notebook for every two classes.": "每一到两节课准备一本纸质笔记本。",
        "class": "节课", "classes": "节课",
        "Which weather conditions apply?": "今天的天气情况如何？",
        "Choose every condition that fits your day.": "可选择所有符合今天情况的选项。",
        "Sunny": "晴天", "Rainy": "下雨", "Hot": "炎热", "Cold": "寒冷",
        "Will you exercise outdoors today?": "今天会在户外运动吗？",
        "Add a sports drink only when your day includes outdoor activity.": "只有安排户外运动时，才会带一瓶运动饮料。",
        "Yes, outdoors": "会，去户外", "No exercise": "不运动",
        "Which devices do you need?": "需要带哪些电子设备？",
        "Choose either one, both, or leave both at home.": "可以选一件、两件，或者都不带。",
        "Tablet": "平板电脑", "Laptop": "笔记本电脑",
        "Pack my bag": "整理书包", "Pack again": "重新整理", "Packing…": "正在装包…", "Reset choices": "重置选择",
        "Step 2 · Watch it pack": "第二步 · 看书包装好",
        "Your backpack": "你的书包",
        "Needed items will move into the bag. The rest can stay home.": "需要的物品会装进书包，其他物品可以留在家里。",
        "On your desk": "桌面上的物品",
        "Only the objects move into the bag": "只有需要的物品会装进书包",
        "Notebook 1": "笔记本 1", "Notebook 2": "笔记本 2", "Notebook 3": "笔记本 3",
        "Paper notebook": "纸质笔记本",
        "Umbrella": "雨伞", "Water": "饮用水", "Mineral water": "矿泉水", "Sports drink": "运动饮料",
        "Overshirt": "外套", "Blue denim overshirt": "蓝色牛仔外套",
        "Packing status": "装包进度", "Make your choices, then pack your bag.": "选好物品后，点击整理书包。",
        "Your final loadout": "最终携带物品",
        "Inside your bag": "书包里有",
        "Your packing list will appear here.": "这里会显示你的装包清单。",
        "No weather condition is selected": "未选择天气情况",
        "Sunny weather needs no extra item": "晴天不需要额外物品",
        "Rain adds an umbrella": "下雨需要带雨伞",
        "Hot weather adds mineral water": "炎热天气需要带矿泉水",
        "Cold weather adds a denim overshirt": "寒冷天气需要带牛仔外套",
        "Outdoor exercise adds a sports drink": "户外运动需要带运动饮料",
        "No outdoor exercise means no sports drink": "没有户外运动，无需带运动饮料",
        "Your tablet and laptop are both selected": "已选择平板电脑和笔记本电脑",
        "Your tablet is selected": "已选择平板电脑",
        "Your laptop is selected": "已选择笔记本电脑",
        "No device is selected": "没有选择电子设备",
        "Packing in progress…": "正在装包…",
        "Opening the backpack zipper…": "正在拉开书包拉链…",
        "Everything is inside. Closing the zipper…": "物品已经装好，正在拉上拉链…",
        "Your bag is packed — you are ready to go!": "书包整理好了，可以出发！",
        "Choices updated. Pack your bag when you are ready.": "选择已更新，准备好后再整理书包。",
        "Your updated list is ready to pack.": "更新后的物品清单已准备好。",
        "You’re ready for class.": " 准备好了！",
        "Back to backpack": "返回书包",
        "Close celebration and return to your backpack": "关闭动画并返回书包",

        "MOVE. RESET. RETURN.": "运动 · 放松 · 回归",
        "Find your active break": "寻找适合你的课间运动",
        "Tell us what works for your day. We will filter activities by your practical limits, then rank the remaining options by how well they match your preferences.": "告诉我们今天适合怎样运动。我们会先按时间、场地和器材筛选，再根据你的喜好推荐活动。",
        "STEP 1 · YOUR PREFERENCES": "第一步 · 选择偏好",
        "Plan your activity": "规划你的活动",
        "Choose one answer in each group. You can change them at any time.": "每组选择一项，之后也可以随时更改。",
        "What is your main goal?": "你最想达到什么目标？",
        "General fitness": "增强体能", "Build endurance": "提高耐力", "Build strength": "增强力量",
        "Relax and reset": "放松调整", "Improve flexibility": "提高柔韧性", "Meet and move with others": "和朋友一起活动",
        "How much time do you have?": "你有多少时间？",
        "10–20 min": "10–20 分钟", "20–40 min": "20–40 分钟", "40–60 min": "40–60 分钟", "60+ min": "60 分钟以上",
        "Where can you exercise?": "你在哪里运动？",
        "Anywhere": "不限地点", "Indoor": "室内", "Outdoor": "室外", "Indoor or outdoor": "室内或室外",
        "What intensity do you prefer?": "你喜欢什么运动强度？",
        "No preference": "没有偏好", "Light": "轻度", "Moderate": "中等", "Vigorous": "高强度",
        "What equipment can you access?": "你能使用哪些器材？",
        "None": "没有器材", "Basic": "基础器材", "Sports facilities": "运动设施",
        "“Sports facilities” means you can access the activity's required equipment and venue.": "“运动设施”表示你可以使用该活动需要的器材和场地。",
        "What is your experience level?": "你的运动经验如何？",
        "Beginner": "初学者", "Intermediate": "有一定经验", "Advanced": "熟练",
        "How would you like to exercise?": "你想和谁一起运动？",
        "On my own": "自己运动", "With a partner": "和同伴一起", "In a group": "与一群人一起",
        "Find my activity": "推荐适合我的运动",
        "A quick safety note:": "温馨提示：",
        "This student project offers general activity ideas, not medical advice. If you have an injury, pain or an exercise restriction, ask a qualified health professional before choosing an activity.": "本学生项目提供一般性的活动建议。如果你有伤病、疼痛或运动限制，选择活动前请咨询专业人士。",
        "STEP 2 · YOUR RESULT": "第二步 · 查看结果",
        "Your active break": "你的课间活动",
        "Replay animation": "重播动画",
        "A little movement goes a long way.": "稍微动一动，也能让自己更有活力。",
        "BEST MATCH FOR YOU": "最适合你的选择",
        "ANOTHER GOOD MATCH": "另一个合适的选择",
        "ACTIVITY LIBRARY PREVIEW": "活动库预览",
        "Suggested time": "建议时长", "15 minutes": "15 分钟",
        "Typical intensity": "通常强度", "Setting": "活动场地", "Equipment": "所需器材",
        "Why this is a good match": "为什么适合你",
        "How to begin": "如何开始",
        "Start gently, choose a comfortable pace and stop if anything feels wrong.": "从轻松的节奏开始，如果身体感到不适，请停下来休息。",
        "Other good matches": "其他合适的活动",
        "These options also fit your practical requirements.": "这些活动也符合你的实际条件。",
        "No exact match found": "没有找到完全匹配的活动",
        "Your current time, venue and equipment choices leave no activity in our list. Try allowing a longer time window, another setting or access to basic equipment.": "当前的时间、场地和器材条件没有匹配的活动。试着增加可用时间、调整场地或选择基础器材。",
        "Adjust my preferences": "调整偏好",
        "You are previewing an activity from the library, not viewing a personalised recommendation. Select “Find my activity” to return to your matches.": "你正在预览活动库里的项目。点击“推荐适合我的运动”可返回个性化推荐。",
        "EXPLORE MORE": "继续探索",
        "Activity library": "活动库",
        "Preview any activity below. Your personalised results will remain based on your selected preferences.": "点击下方活动可预览。个性化推荐仍会根据你的选择生成。",
        "No activities match all of your selected time, venue and equipment requirements.": "没有活动同时满足你选择的时间、场地和器材条件。",
        "Explore this activity": "了解这项活动",
        "Start at a comfortable level, warm up first and stop if you feel pain, dizziness or unusual discomfort.": "先热身，再以舒适的强度开始。如果出现疼痛、头晕或其他不适，请停止运动。",
        "Cardio": "有氧运动", "Mind and body": "身心活动", "Strength": "力量训练", "Racket sport": "球拍运动",
        "Team sport": "团队球类", "Water activity": "水上运动",
        "Light to moderate": "轻度至中等", "Moderate to vigorous": "中等至高强度", "Variable: light to vigorous": "强度可调：轻度至高强度",
        "No equipment": "无需器材", "Running shoes": "跑鞋", "No equipment (mat optional)": "无需器材（可用瑜伽垫）",
        "Jump rope": "跳绳", "Bicycle or stationary bike": "自行车或动感单车",
        "Racket, shuttlecock and court": "球拍、羽毛球和场地", "Paddles, ball and table": "球拍、球和球桌",
        "Basketball and court": "篮球和场地", "Football and playing space": "足球和活动场地",
        "Volleyball, net and court": "排球、球网和场地", "Swimming pool and swimwear": "泳池和泳衣",
        "Suitable weights or gym equipment": "合适的重量器械或健身设备",
        "Walking": "散步", "Running": "跑步", "Yoga": "瑜伽", "Bodyweight Training": "徒手训练",
        "Jump Rope": "跳绳", "Cycling": "骑行", "Badminton": "羽毛球", "Table Tennis": "乒乓球",
        "Basketball": "篮球", "Football": "足球", "Volleyball": "排球", "Swimming": "游泳", "Strength Training": "力量训练",
        "10–20 minutes": "10–20 分钟", "20–40 minutes": "20–40 分钟", "40–60 minutes": "40–60 分钟", "60+ minutes": "60 分钟以上",

        "Questions. Ideas. Feedback.": "问题 · 想法 · 建议",
        "Contact Me": "联系我",
        "Have a question about Campus Desk or an idea for a useful student tool? Send me a message.": "对 Campus Desk 有疑问，或者想到有用的学生工具？欢迎给我留言。",
        "Open the envelope": "打开信封", "A note for Campus Desk": "写给 Campus Desk 的留言",
        "Questions?": "有问题？", "Fresh ideas": "新想法", "Feedback welcome": "欢迎建议",
        "Contact me": "联系我", "Share your ideas.": "分享你的想法。",
        "Click to open the envelope": "点击打开信封", "Close the envelope": "合上信封",
        "Questions, ideas and feedback are always welcome.": "欢迎提出问题、分享想法和建议。",
        "Email directly": "直接发送邮件", "Send a message": "发送留言",
        "Write your note below. When you send it, your email application will open with the message ready.": "在下方写好留言后点击发送，邮件应用会打开并填入内容。",
        "Your name": "你的姓名", "Your email": "你的邮箱", "Subject": "邮件主题", "Message": "留言内容",
        "Send email": "打开邮件应用发送", "Your message is not stored by this website.": "本站不会保存你的留言。"
    });

    Object.assign(zh, {
        "A decorative stack of books": "装饰书堆",
        "Example notebooks": "示例笔记本",
        "Your added notebooks, shelf two": "你添加的笔记本，第二层",
        "Your added notebooks, shelf three": "你添加的笔记本，第三层",
        "Notebook writing tools": "笔记书写工具",
        "Notebook page navigation": "笔记翻页",
        "Close new notebook dialog": "关闭新建笔记本窗口",
        "Use charcoal text": "使用深灰色文字",
        "Use blue text": "使用蓝色文字",
        "Use green text": "使用绿色文字",
        "Use burgundy text": "使用酒红色文字",
        "Use violet text": "使用紫色文字",
        "Use orange text": "使用橙色文字",
        "Personalised activity finder": "个性化运动推荐",
        "Animated illustration of a person walking": "人物散步动画",
        "Visit Project Gutenberg": "访问古登堡计划",
        "Visit Standard Ebooks": "访问 Standard Ebooks",
        "Visit Google Scholar": "访问谷歌学术",
        "Visit the Directory of Open Access Journals": "访问开放获取期刊目录",
        "Visit Open Library": "访问开放图书馆",
        "Visit Internet Archive": "访问互联网档案馆",
        "Read Pride and Prejudice by Jane Austen": "阅读简·奥斯汀的《傲慢与偏见》",
        "Read Frankenstein by Mary Shelley": "阅读玛丽·雪莱的《弗兰肯斯坦》",
        "Read The Adventures of Sherlock Holmes": "阅读《福尔摩斯探案集》",
        "Read Alice's Adventures in Wonderland": "阅读《爱丽丝梦游仙境》",
        "Read Dracula by Bram Stoker": "阅读布莱姆·斯托克的《德古拉》",
        "Read Jane Eyre by Charlotte Bronte": "阅读《简·爱》",
        "Read Moby Dick by Herman Melville": "阅读《白鲸》",
        "Read The Great Gatsby by F. Scott Fitzgerald": "阅读《了不起的盖茨比》",
        "A comfortable walk is a simple way to leave your screen, reset your posture and clear your mind.": "舒服地散步可以让你暂时离开屏幕，舒展身体，理清思绪。",
        "Stand tall and relax your shoulders.": "站直身体，放松肩膀。",
        "Walk at a comfortable, purposeful pace.": "以舒适、稳定的步伐行走。",
        "Slow down gently before returning to your desk.": "回到书桌前逐渐放慢脚步。",
        "A short run or walk-run interval can build cardiovascular fitness. Beginners can alternate easy jogging with walking.": "短跑或跑走交替有助于锻炼心肺。初学者可以慢跑与步行交替进行。",
        "Begin with a few minutes of brisk walking.": "先快走几分钟热身。",
        "Jog at a pace that feels controlled.": "以自己能掌控的速度慢跑。",
        "Walk slowly to cool down.": "最后慢走放松。",
        "A gentle yoga break combines controlled movement, balance and breathing. Choose simple poses that feel comfortable.": "温和的瑜伽结合动作、平衡与呼吸。选择让自己感到舒适的简单体式。",
        "Find a clear, stable space.": "找一处平稳、宽敞的地方。",
        "Move slowly through comfortable stretches.": "缓慢完成舒适的伸展动作。",
        "Breathe steadily and avoid forcing a position.": "保持平稳呼吸，不要勉强完成动作。",
        "Simple bodyweight movements can train several muscle groups without gym equipment. Adjust the movement to your current ability.": "简单的徒手动作无需健身器材也能锻炼多个肌群。按自己的能力调整动作。",
        "Warm up with easy joint movements.": "先做轻松的关节活动热身。",
        "Try controlled squats, wall push-ups or standing exercises.": "试试可控的深蹲、靠墙俯卧撑或站姿练习。",
        "Rest between sets and keep every movement controlled.": "组间适当休息，保持动作稳定。",
        "Short skipping intervals create an energetic cardiovascular break. Use a clear space and begin with small, controlled jumps.": "短时间跳绳可以带来充满活力的有氧休息。找一片空地，从小幅度跳跃开始。",
        "Check that the floor and surrounding area are clear.": "确认地面和周围没有障碍物。",
        "Start with short intervals and small jumps.": "从短组练习和小幅跳跃开始。",
        "Pause to rest whenever you need to.": "需要时随时停下休息。",
        "Cycling can be adapted to different paces and can take place outdoors or on a stationary bike.": "骑行可以调整速度，也可以在室外或室内骑动感单车。",
        "Check the bicycle and wear a suitable helmet outdoors.": "检查自行车，室外骑行时佩戴合适的头盔。",
        "Begin at an easy pace on a safe route or stationary bike.": "在安全路线上或动感单车上以轻松的速度开始。",
        "Increase effort only if it feels comfortable.": "感觉舒适时再逐步提高强度。",
        "A friendly badminton session combines coordination and movement. Beginners can start with gentle rallies.": "轻松的羽毛球活动结合了协调性与身体活动。初学者可以先做简单对打。",
        "Warm up your shoulders, wrists and legs.": "活动肩膀、手腕和腿部。",
        "Start with short, controlled rallies.": "先进行短距离、可控的对打。",
        "Move around the court at a comfortable pace.": "以舒适的节奏在场地上移动。",
        "Table tennis is a compact activity for practising coordination and enjoying a short social break.": "乒乓球适合在小场地练习协调性，也能和朋友一起短暂放松。",
        "Relax your shoulders and hold the paddle comfortably.": "放松肩膀，舒适地握住球拍。",
        "Begin with steady, gentle returns.": "先平稳地轻轻回球。",
        "Increase the pace only when both players are ready.": "双方都准备好后再加快节奏。",
        "You do not need a full match to enjoy basketball: shooting and controlled dribbling are useful ways to move.": "打篮球不一定要进行整场比赛；投篮和可控的运球也能让身体活动起来。",
        "Warm up your wrists, shoulders and legs.": "活动手腕、肩膀和腿部。",
        "Practise slow dribbling or close-range shots.": "练习慢速运球或近距离投篮。",
        "Take breaks and keep the pace comfortable.": "适时休息，保持舒适的节奏。",
        "A short football break can focus on gentle dribbling and passing instead of a full competitive match.": "短暂的足球活动可以练习轻松的带球和传球，不必踢完整场比赛。",
        "Warm up your ankles, knees and hips.": "活动脚踝、膝盖和髋部。",
        "Practise close control at a slow pace.": "用较慢的速度练习控球。",
        "Try short passes with a partner.": "和同伴练习短传。",
        "Passing and setting with a partner can make volleyball accessible even without organising a full game.": "即使不组织完整比赛，也可以和同伴练习垫球和传球。",
        "Warm up your shoulders, wrists and fingers.": "活动肩膀、手腕和手指。",
        "Practise gentle forearm passes.": "练习轻柔的前臂垫球。",
        "Add simple sets when you feel ready.": "准备好后再加入简单的传球。",
        "Swimming offers a whole-body activity. Only swim where lifeguards or appropriate supervision are available, and only if you can swim safely.": "游泳能锻炼全身。请只在有救生员或适当看护的场所、并且自己能够安全游泳时下水。",
        "Use a supervised pool and follow its safety rules.": "在有人看护的泳池游泳，并遵守安全规定。",
        "Start gently and choose a distance that suits your ability.": "慢慢开始，选择适合自己能力的距离。",
        "Rest when needed and leave the water if you feel unwell.": "需要时休息；如有不适，请立即离开水中。",
        "A short strength session can use light, manageable resistance and controlled technique.": "短时间力量训练可以选择较轻、可控的阻力，并注意动作技术。",
        "Warm up before using weights.": "使用重量器械前先热身。",
        "Choose a manageable resistance and learn the movement first.": "选择可控的阻力，先学会正确动作。",
        "Stop if your technique becomes uncomfortable or uncontrolled.": "如果动作不舒服或难以控制，就停下来。"
    });

    let currentLanguage = "en";
    try {
        currentLanguage = sessionStorage.getItem(STORAGE_KEY) === "zh" ? "zh" : "en";
    } catch (error) {
        // The switch still works when browser storage is disabled.
    }

    const textSources = new WeakMap();
    const attributeSources = new WeakMap();
    const attributes = ["aria-label", "alt", "placeholder", "title"];
    let switcher;
    let scheduled = false;

    function formatText(source) {
        if (Object.prototype.hasOwnProperty.call(zh, source)) return zh[source];
        const capitalized = source.charAt(0).toUpperCase() + source.slice(1);
        if (Object.prototype.hasOwnProperty.call(zh, capitalized)) return zh[capitalized];
        let match;
        if ((match = /^Page (\d+)$/.exec(source))) return "第 " + match[1] + " 页";
        if ((match = /^Page (\d+) selected$/.exec(source))) return "已选中第 " + match[1] + " 页";
        if ((match = /^(\d+) words?$/.exec(source))) return match[1] + " 字/词";
        if ((match = /^(\d+) paper notebooks?$/.exec(source))) return match[1] + " 本纸质笔记本";
        if ((match = /^paper notebook (\d+)$/i.exec(source))) return "纸质笔记本 " + match[1];
        if ((match = /^(\d+) minutes?$/.exec(source))) return match[1] + " 分钟";
        if ((match = /^(\d+) min · (\d+)% preference fit$/.exec(source))) return match[1] + " 分钟 · 偏好匹配 " + match[2] + "%";
        if ((match = /^(\d+)% preference fit$/.exec(source))) return "偏好匹配 " + match[1] + "%";
        if ((match = /^(\d+) (class|classes) means (\d+) (notebook|notebooks)\. (.+)\. (.+)\. (.+)\.$/.exec(source))) {
            return match[1] + " 节课需要 " + match[3] + " 本笔记本。" +
                match[5].split(". ").map(formatText).join("；") + "。" +
                formatText(match[6]) + "。" + formatText(match[7]) + "。";
        }
        if ((match = /^Packing (.+)…$/.exec(source))) return "正在装入" + formatText(match[1]) + "…";
        if ((match = /^(.+): a simple movement break for your day\.$/.exec(source))) return formatText(match[1]) + "：适合今天的简单运动。";
        if ((match = /^Animated illustration of (.+)$/.exec(source))) return formatText(match[1]) + "运动动画";
        if ((match = /^Preview (.+)$/.exec(source))) return "预览" + formatText(match[1]);
        if ((match = /^Open (.+) notebook$/.exec(source))) {
            const name = match[1];
            const label = ["Web Technology", "Git & GitHub", "German", "Personal Notes"].includes(name)
                ? formatText(name) : name;
            return "打开" + label + "笔记本";
        }
        if ((match = /^Activity category: (.+)\.$/.exec(source))) return "运动类别：" + formatText(match[1]) + "。";
        if ((match = /^Typical setting: (.+)\.$/.exec(source))) return "常见场地：" + formatText(match[1]) + "。";
        if ((match = /^Equipment: (.+)\.$/.exec(source))) return "所需器材：" + formatText(match[1]) + "。";
        if ((match = /^(.+) · from (\d+) min$/.exec(source))) return formatText(match[1]) + " · " + match[2] + " 分钟起";
        if ((match = /^(.+) activity preview loaded\.$/.exec(source))) return "已加载" + formatText(match[1]) + "预览。";
        if ((match = /^(.+) selected\. (\d+) percent preference fit\.$/.exec(source))) return "已选择" + formatText(match[1]) + "，偏好匹配 " + match[2] + "%。";
        if ((match = /^(\d+) activities match your practical requirements\. Best match: (.+)\.$/.exec(source))) return "有 " + match[1] + " 项运动符合条件。最适合你的是" + formatText(match[2]) + "。";
        if ((match = /^Matches your goal: (.+)\.$/.exec(source))) return "符合你的目标：" + formatText(match[1]) + "。";
        if ((match = /^Its suggested (\d+)-minute session fits your time range\.$/.exec(source))) return "建议的 " + match[1] + " 分钟活动符合你的时间安排。";
        if ((match = /^A shorter (\d+)-minute session is possible within your available time\.$/.exec(source))) return "你也可以在可用时间内进行 " + match[1] + " 分钟的活动。";
        if ((match = /^Supports your preferred (light|moderate|vigorous) intensity\.$/.exec(source))) return "符合你偏好的" + formatText(match[1]) + "强度。";
        if ((match = /^Its typical learning level matches your (beginner|intermediate|advanced) experience\.$/.exec(source))) return "难度适合你目前的" + formatText(match[1]) + "水平。";
        if ((match = /^Fits your preference: (.+)\.$/.exec(source))) return "符合你的运动方式偏好：" + formatText(match[1]) + "。";
        if ((match = /^Available in an (indoor|outdoor) setting\.$/.exec(source))) return "可以在" + formatText(match[1]) + "进行。";
        if ((match = /^Fits your selected equipment access: (no equipment|basic equipment)\.$/.exec(source))) return "符合你的器材条件：" + formatText(match[1]) + "。";
        return source;
    }

    Object.assign(zh, {
        "beginner": "初学者", "intermediate": "有一定经验", "advanced": "熟练",
        "light": "轻度", "moderate": "中等", "vigorous": "高强度",
        "indoor": "室内", "outdoor": "室外", "no equipment": "无需器材",
        "basic equipment": "基础器材",
        "You can adapt this activity to your current experience level.": "你可以根据目前的经验调整活动难度。",
        "notebook": "笔记本", "notebooks": "笔记本",
        "You are ready to go!": "可以出发了！",
        "Built by X20250020": "X20250020 制作",
        "Create notebook": "创建笔记本",
        "For example: Mathematics": "例如：数学",
        "Page title": "页面标题",
        "Write on the left page...": "在左页记录想法…",
        "Write on the right page...": "在右页记录想法…",
        "1 class means 1 notebook. No weather extra, sports drink or device selected.": "1 节课需要 1 本笔记本。尚未选择额外天气物品、运动饮料或电子设备。",
        "A comfortable walk is a simple way to reset between study sessions.": "学习间隙散散步，可以轻松调整状态。"
    });

    function isProtected(element) {
        return !element || Boolean(element.closest(
            "script, style, textarea, input, [contenteditable], [data-i18n-ignore], " +
            ".notebook-book[data-notebook^='notebook-'], " +
            "#turning-front-preview, #turning-back-preview, #turning-front-title, #turning-back-title"
        ));
    }

    function translateTextNode(node) {
        if (isProtected(node.parentElement)) return;
        const value = node.nodeValue;
        let record = textSources.get(node);
        if (!record || value !== record.output) record = { source: value, output: value };
        const match = /^(\s*)(.*?)(\s*)$/s.exec(record.source);
        const key = match && match[2].replace(/\s+/g, " ").trim();
        const localized = currentLanguage === "zh" && key ? formatText(key) : key;
        const translated = currentLanguage === "zh" && localized !== key
            ? match[1] + localized + match[3]
            : record.source;
        record.output = translated;
        textSources.set(node, record);
        if (value !== translated) node.nodeValue = translated;
    }

    function translateAttributes(element) {
        if (element.closest("script, style, [data-i18n-ignore], .language-switch")) return;
        let records = attributeSources.get(element);
        if (!records) records = {};
        for (const name of attributes) {
            if (!element.hasAttribute(name)) continue;
            const value = element.getAttribute(name);
            let record = records[name];
            if (!record || value !== record.output) record = { source: value, output: value };
            const translated = currentLanguage === "zh" ? formatText(record.source) : record.source;
            record.output = translated;
            records[name] = record;
            if (value !== translated) element.setAttribute(name, translated);
        }
        attributeSources.set(element, records);
    }

    function translateTree(root) {
        if (root.nodeType === Node.TEXT_NODE) {
            translateTextNode(root);
            return;
        }
        if (root.nodeType !== Node.ELEMENT_NODE) return;
        const element = root;
        if (element.closest("script, style, [data-i18n-ignore], .language-switch")) return;
        translateAttributes(element);
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
        while (walker.nextNode()) {
            const item = walker.currentNode;
            if (item.nodeType === Node.TEXT_NODE) translateTextNode(item);
            else translateAttributes(item);
        }
    }

    function renderLanguage() {
        document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
        document.title = currentLanguage === "zh" ? formatText(englishTitle) : englishTitle;
        document.querySelectorAll(".language-switch button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
        });
        translateTree(document.body);
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            const original = description.dataset.englishDescription || description.content;
            description.dataset.englishDescription = original;
            description.content = currentLanguage === "zh" ? formatText(original) : original;
        }
    }

    function setLanguage(language) {
        if (language !== "en" && language !== "zh") return;
        currentLanguage = language;
        try { sessionStorage.setItem(STORAGE_KEY, language); } catch (error) {}
        renderLanguage();
        document.dispatchEvent(new CustomEvent("campus:language-change", { detail: { language } }));
    }

    function createSwitcher() {
        const header = document.querySelector(".hero-header, .site-header");
        if (!header) return;
        switcher = document.createElement("div");
        switcher.className = "language-switch";
        switcher.setAttribute("role", "group");
        switcher.setAttribute("aria-label", "Language / 语言");
        switcher.innerHTML = '<button type="button" data-language="zh" aria-label="切换为中文">中</button><button type="button" data-language="en" aria-label="Switch to English">En</button>';
        switcher.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-language]");
            if (button) setLanguage(button.dataset.language);
        });
        if (header.classList.contains("hero-header")) {
            const actions = document.createElement("div");
            actions.className = "header-actions";
            const contact = header.querySelector(".contact-link");
            header.append(actions);
            actions.append(switcher);
            if (contact) actions.append(contact);
        } else {
            header.append(switcher);
        }
    }

    createSwitcher();
    const englishTitle = document.title;
    renderLanguage();
    const observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            translateTree(document.body);
        });
    });
    observer.observe(document.body, {
        childList: true, characterData: true, attributes: true, subtree: true,
        attributeFilter: attributes
    });
    window.CampusDeskLanguage = { get current() { return currentLanguage; }, translate: formatText, set: setLanguage };
})();
