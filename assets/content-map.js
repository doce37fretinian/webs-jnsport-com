// assets/content-map.js
// Configuration for site content sections, keyword tags, and search filtering

const siteConfig = {
  baseUrl: "https://webs-jnsport.com",
  defaultKeyword: "江南体育",
  siteName: "JNSport Web",
  version: "1.0.2"
};

// Content sections with associated tags
const contentSections = [
  {
    id: "section-home",
    title: "首页",
    tags: ["首页", "江南体育", "体育新闻", "赛事"],
    keywords: ["江南体育", "首页", "最新动态"],
    content: "欢迎来到江南体育"
  },
  {
    id: "section-sports",
    title: "体育项目",
    tags: ["篮球", "足球", "网球", "江南体育"],
    keywords: ["江南体育", "篮球联赛", "足球赛"],
    content: "覆盖多种体育项目"
  },
  {
    id: "section-news",
    title: "新闻资讯",
    tags: ["新闻", "赛事报道", "江南体育", "体育分析"],
    keywords: ["江南体育", "最新新闻", "体育资讯"],
    content: "实时体育新闻与深度分析"
  },
  {
    id: "section-about",
    title: "关于我们",
    tags: ["关于", "江南体育", "品牌介绍", "联系方式"],
    keywords: ["江南体育", "关于我们", "品牌"],
    content: "了解江南体育的历史与愿景"
  },
  {
    id: "section-gallery",
    title: "图集",
    tags: ["图片", "江南体育", "精彩瞬间", "赛事"],
    keywords: ["江南体育", "图集", "体育摄影"],
    content: "精彩赛事图片合集"
  }
];

// Additional keyword aliases for flexible searching
const keywordAliases = {
  "江南体育": ["jnsport", "jiangnan sports", "江南运动"],
  "体育": ["sports", "运动"],
  "新闻": ["news", "资讯", "报道"],
  "篮球": ["basketball", "NBA"],
  "足球": ["football", "soccer"],
  "网球": ["tennis"]
};

// Simple search filter function
function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery.length === 0) return [];

  // Expand query with aliases
  const expandedTerms = [lowerQuery];
  for (const [key, aliases] of Object.entries(keywordAliases)) {
    if (lowerQuery.includes(key.toLowerCase())) {
      aliases.forEach(alias => expandedTerms.push(alias.toLowerCase()));
    }
    aliases.forEach(alias => {
      if (alias.toLowerCase() === lowerQuery) {
        expandedTerms.push(key.toLowerCase());
      }
    });
  }

  // Filter sections by tags or keywords
  const results = contentSections.filter(section => {
    const combined = [
      ...section.tags.map(t => t.toLowerCase()),
      ...section.keywords.map(k => k.toLowerCase()),
      section.title.toLowerCase(),
      section.content.toLowerCase()
    ];

    return expandedTerms.some(term =>
      combined.some(item => item.includes(term))
    );
  });

  // Return matched sections with relevance score (simple count)
  return results.map(section => {
    const score = expandedTerms.reduce((acc, term) => {
      const inTags = section.tags.some(t => t.toLowerCase().includes(term)) ? 1 : 0;
      const inKeywords = section.keywords.some(k => k.toLowerCase().includes(term)) ? 1 : 0;
      const inTitle = section.title.toLowerCase().includes(term) ? 1 : 0;
      return acc + inTags + inKeywords + inTitle;
    }, 0);

    return { ...section, relevance: score };
  }).sort((a, b) => b.relevance - a.relevance);
}

// Example usage (uncomment to test)
// console.log("Search for '江南体育':", searchContent("江南体育"));
// console.log("Search for '篮球':", searchContent("篮球"));

// Export for module systems (optional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { siteConfig, contentSections, keywordAliases, searchContent };
}