// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-photo-gallery",
      
        title: "Photo Gallery",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/12/04/photo-gallery.html";
        
      },
    },{id: "post-tabs",
      
        title: "Tabs",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/05/01/tabs.html";
        
      },
    },{id: "post-typograms",
      
        title: "Typograms",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/04/29/typograms.html";
        
      },
    },{id: "post-post-citation",
      
        title: "Post Citation",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/04/28/post-citation.html";
        
      },
    },{id: "post-pseudocode",
      
        title: "Pseudocode",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/04/15/pseudocode.html";
        
      },
    },{id: "post-vega-lite",
      
        title: "Vega Lite",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/27/vega-lite.html";
        
      },
    },{id: "post-code-diff",
      
        title: "Code Diff",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/27/code-diff.html";
        
      },
    },{id: "post-advanced-images",
      
        title: "Advanced Images",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/27/advanced-images.html";
        
      },
    },{id: "post-geojson-map",
      
        title: "Geojson Map",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/26/geojson-map.html";
        
      },
    },{id: "post-echarts",
      
        title: "Echarts",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/26/echarts.html";
        
      },
    },{id: "post-chartjs",
      
        title: "Chartjs",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2024/01/26/chartjs.html";
        
      },
    },{id: "post-tikzjax",
      
        title: "Tikzjax",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/12/12/tikzjax.html";
        
      },
    },{id: "post-post-bibliography",
      
        title: "Post Bibliography",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/07/12/post-bibliography.html";
        
      },
    },{id: "post-jupyter-notebook",
      
        title: "Jupyter Notebook",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/07/04/jupyter-notebook.html";
        
      },
    },{id: "post-custom-blockquotes",
      
        title: "Custom Blockquotes",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/05/12/custom-blockquotes.html";
        
      },
    },{id: "post-sidebar-table-of-contents",
      
        title: "Sidebar Table Of Contents",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/04/25/sidebar-table-of-contents.html";
        
      },
    },{id: "post-audios",
      
        title: "Audios",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/04/25/audios.html";
        
      },
    },{id: "post-videos",
      
        title: "Videos",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/04/24/videos.html";
        
      },
    },{id: "post-tables",
      
        title: "Tables",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/03/21/tables.html";
        
      },
    },{id: "post-table-of-contents",
      
        title: "Table Of Contents",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2023/03/20/table-of-contents.html";
        
      },
    },{id: "post-giscus-comments",
      
        title: "Giscus Comments",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2022/12/10/giscus-comments.html";
        
      },
    },{id: "post-redirect",
      
        title: "Redirect",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2022/02/01/redirect.html";
        
      },
    },{id: "post-diagrams",
      
        title: "Diagrams",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2021/07/04/diagrams.html";
        
      },
    },{id: "post-twitter",
      
        title: "Twitter",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2020/09/28/twitter.html";
        
      },
    },{id: "post-distill",
      
        title: "Distill",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2018/12/22/distill.html";
        
      },
    },{id: "post-math",
      
        title: "Math",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2015/10/20/math.html";
        
      },
    },{id: "post-disqus-comments",
      
        title: "Disqus Comments",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2015/10/20/disqus-comments.html";
        
      },
    },{id: "post-code",
      
        title: "Code",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2015/07/15/code.html";
        
      },
    },{id: "post-images",
      
        title: "Images",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2015/05/15/images.html";
        
      },
    },{id: "post-formatting-and-links",
      
        title: "Formatting And Links",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/2015/03/15/formatting-and-links.html";
        
      },
    },{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "projects-path-planning-with-kinodynamic-constraints",
          title: 'Path Planning with Kinodynamic Constraints',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-robotic-arm-manipulation",
          title: 'Robotic Arm Manipulation',
          description: "Manipulating and Controlling a robotic arm in real world",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-suntracker-on-rocker-bogie-mechanism",
          title: 'Suntracker on Rocker-Bogie mechanism',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-alohamora",
          title: 'Alohamora',
          description: "Boundary Detection and Image Recognition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-quadrotor-control",
          title: 'Quadrotor Control',
          description: "PID and LQR control of a Quadrotor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-out-of-control-planning",
          title: 'Out of Control Planning',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
