module.exports = {
  title: `C-Design`,
  description: `Life is Č between B and D`,
  language: 'ko',

  siteUrl: `https://c-designer.github.io`,
  ogImage: `/og-image.png`, // Path to your image you placed in the 'static' folder
  comments: {
    utterances: {
      repo: `c-designer/c-designer.github.io`,
    },
  },
  ga: 'G-Q6WR98DY1X', // Google Analytics Tracking ID

  // metadata for bio
  author: {
    name: `김창동`,
    bio: {
      role: `개발자`,
      description: ['실용적인 것을 만드는', '능동적으로 일하는', '지속가능성을 추구하는'],
      thumbnail: 'zoomkoding.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/c-designer`,
      linkedIn: `https://www.linkedin.com/in/c-design-186a85216/`,
      email: `c.designer.dev@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      {
        date: '2020.12 ~ 2021.07',
        activity: 'Codestates AI Course',
        links: {
          post: 'https://codestates.com/course/ai'
        }
      },
      {
        date: '2021.07',
        activity: 'K-Digital Training Hackathon 우수상',
        links: {
          post: 'http://www.k-digitalhackathon.kr'
        }
      }
    ],
    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '콘솔 게임 시장분석',
        description: '콘솔 게임 판매량 데이터셋을 분석하였습니다. 해당 시장을 이해하고 다음분기 게임 개발은 어떤 방향으로 진행하는것이 나을지 인사이트를 도출하였습니다.',
        techStack: ['Python', 'Data-Analysis'],
        thumbnailUrl: 'console-game.jpg',
        links:{
          post: 'https://www.kaggle.com/gregorut/videogamesales',
          github: 'https://github.com/C-Designer/Codestates_Section_Project/tree/main/Section1',
        }
      },
      {
        title: '골격 구조에 따른 견관절 주요질환 예측모델 개발',
        description: '여러 유형의 견관절 심부구조를 파악하여 구조적 특성과 결함을 도출하였습니다. 해당 질환과 연관성을 찾아 예측해주는 모델을 개발하였습니다.',
        techStack: ['Python', 'Machine-Learning'],
        thumbnailUrl: 'scapula.jpeg',
        links:{
          post: 'https://www.kaggle.com/iham97/deepscapulassm?select=scapFeaturesUnif_3.csv',
          github: 'https://github.com/C-Designer/Codestates_Section_Project/blob/main/Section2/Section2_Project.ipynb'
        }
      },
      {
        title: '트레이너 & 회원 매칭 서비스',
        description: 'PT트레이너로 근무했던 헬스장에선 회원분들께 WPI라는 성향검사를 하였습니다. 회사내 쌓인 데이터를 통해 어떤 트레이너와 매칭율이 높을지 예측 및 추천해주는 웹서비스를 개발하였습니다. 이전 회사에 선물하고자 해당 프로젝트를 만들게 되었습니다.',
        techStack: ['Python', 'Flask', 'Sqlite3', 'Bootstrap'],
        thumbnailUrl: 'quaternary.jpg',
        links:{
          post: 'https://c-design.tistory.com/45?category=903742',
          github: 'https://github.com/C-Designer/Codestates_Section_Project/tree/main/Section3'
        }
      }
    ],
  },
};