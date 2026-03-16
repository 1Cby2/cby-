// 作品数据
const worksData = [
    {
        id: 1,
        title: "闲鱼产品运营",
        category: "产品运营",
        image: "compressed_xianyu.jpg",
        description: "这是一个闲鱼产品运营项目，通过数据 analytics 分析平台，实时监控店铺流量、曝光数、浏览数和想要数等关键指标，帮助运营人员快速做出决策。",
        concept: "设计理念：以数据为驱动，通过直观的图表和清晰的界面布局，让运营数据一目了然，提高工作效率。",

        date: "2026-01-15"
    },
    {
        id: 2,
        title: "写真拍摄",
        category: "摄影",
        image: "compressed_xiezhen.jpg",
        images: ["compressed_xiezhen.jpg", "compressed_yuanlin1.jpg", "compressed_yuanlin2.jpg"],
        description: "这是一个写真拍摄项目，通过光影的运用和构图的设计，捕捉人物的真实情感和个性特征。",
        concept: "设计理念：以人物为中心，通过极简的背景和自然的光线，突出主体的魅力和故事性。",
        date: "2026-02-01"
    },
    {
        id: 3,
        title: "婚礼拍摄",
        category: "摄影",
        image: "compressed_dinghun1.jpg",
        images: ["compressed_dinghun1.jpg", "compressed_dinghun2.jpg", "compressed_dinghun3.jpg"],
        description: "这是一个婚礼拍摄项目，通过细腻的镜头语言和专业的构图，记录新人最珍贵的瞬间和情感表达。",
        concept: "设计理念：以情感为核心，通过自然的光线和简洁的构图，捕捉婚礼中的感动瞬间和美好回忆。",
        date: "2026-02-15"
    },
    {
        id: 4,
        title: "产品拍摄",
        category: "摄影",
        image: "compressed_chanpin.jpg",
        description: "这是一个产品拍摄项目，通过专业的灯光和构图，展现产品的细节和质感，提升品牌形象。",
        concept: "设计理念：以产品为中心，通过简洁的背景和精准的光线，突出产品的特点和价值。",
        date: "2026-03-01"
    },
    {
        id: 5,
        title: "产品策划",
        category: "产品策划",
        image: "compressed_chanpincehua.jpg",
        description: "这是一个产品策划项目，通过市场调研和用户分析，制定产品策略和发展规划，提升产品竞争力。",
        concept: "设计理念：以用户需求为核心，通过数据驱动和创新思维，打造符合市场需求的产品解决方案。",
        date: "2026-03-15"
    }
];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏滚动效果
    initNavbarScroll();
    
    // 初始化滚动渐显效果
    initScrollFade();
    
    // 初始化作品卡片点击事件
    initWorkCardClick();
    
    // 初始化波纹效果
    initRippleEffect();
    
    // 检查是否为详情页
    if (window.location.pathname.includes('detail')) {
        initWorkDetail();
    }
});

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 滚动渐显效果
function initScrollFade() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// 作品卡片点击事件
function initWorkCardClick() {
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            const workId = parseInt(this.dataset.id);
            showWorkDetail(workId);
        });
    });
}

// 显示作品详情
function showWorkDetail(workId) {
    const work = worksData.find(w => w.id === workId);
    if (!work) return;
    
    // 创建详情页HTML
    const detailHTML = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${work.title} | 个人作品集</title>
            <link rel="stylesheet" href="style.css">
            <script src="script.js" defer></script>
        </head>
        <body>
            <!-- 导航栏 -->
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a href="index.html">LOGO</a>
                    </div>
                    <div class="navbar-links">
                        <a href="index.html" class="nav-link">HOME</a>
                        <a href="index.html#works" class="nav-link active">WORKS</a>
                        <a href="index.html#about" class="nav-link">MY</a>
                    </div>
                </div>
            </nav>

            <!-- 作品详情 -->
            <section class="work-detail">
                <div class="container">
                    <div class="work-detail-header">
                        <h1>${work.title}</h1>
                        <div class="work-detail-meta">
                            <span>分类：${work.category}</span>
                            <span>完成时间：${work.date}</span>
                        </div>
                    </div>
                    <div class="work-detail-image">
                        ${work.images ? work.images.map(img => `<img src="${img}" alt="${work.title}">`).join('') : `<img src="${work.image}" alt="${work.title}">`}
                    </div>
                    <div class="work-detail-content">
                        <h2>项目介绍</h2>
                        <p>${work.description}</p>
                        <h2>设计理念</h2>
                        <p>${work.concept}</p>
                    </div>
                </div>
            </section>

            <!-- 底部联系方式 -->
            <footer class="footer">
                <div class="container">
                    <div class="contact">
                        <p>Email: 2414396652@qq.com</p>
                        <p>Phone: +86 188 452 26087</p>
                    </div>
                    <div class="copyright">
                        <p>&copy; 2026 DESIGNER NAME. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </body>
        </html>
    `;
    
    // 创建临时详情页文件
    const detailPage = document.createElement('div');
    detailPage.innerHTML = detailHTML;
    document.body.innerHTML = detailPage.innerHTML;
    
    // 重新初始化导航栏滚动效果
    initNavbarScroll();
}

// 波纹效果
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('a, .work-card');
    
    rippleElements.forEach(element => {
        element.classList.add('ripple');
    });
}

// 初始化作品详情页
function initWorkDetail() {
    // 可以在这里添加详情页特定的初始化逻辑
    initNavbarScroll();
}