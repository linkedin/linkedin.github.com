new Konami("https://www.linkedin.com");

var renderPage = function(data) {
  // hide preloader
  $('#preloader').fadeOut(300, function () {
    $(this).remove();
  });

  // repo name to category for repo mapping
  var repoToCategory = {};
  var categories = {};
  liRepoCategories.forEach(function(item) {
    var repos = item["repos"];
    var category = item["category"];
    categories[category] = category;
    repos.forEach(function(repoName) {
      repoToCategory[repoName] = category;
    });
  });

  // repo name to blog post for repo
  var repoToBlogPost = {};

  // repo name to documentation website for repo
  var repoToDoc = {};

  liRepoMetadata.forEach(function(item) {
    var repoName = item["repo"];
    var posts = item["posts"];
    repoToBlogPost[repoName] = posts;
    if ("doc" in item) {
      repoToDoc[repoName] = item["doc"];
    }
  });

  function getBlogposts(repo) {
    var blogListings = "";
    if (repoToBlogPost[repo]) {
      repoToBlogPost[repo].forEach(function(item) {
        var title = item["title"];
        var postUrl = item["url"];
        blogListings += "<a href='" + postUrl + "' target='_blank'>" + title + "</a><br />";
      });
      return blogListings;
    } else {
      return "";
    }
  }

  function getCategory(repo) {
    if (repoToCategory[repo]) {
      return repoToCategory[repo];
    } else {
      return "Other";
    }
  }

  function getLanguage(language) {
    if (language == null) {
      return "Other";
    }
    else {
      return language;
    }
  }

  function generateModalId(name) {
    return name.replace(new RegExp("\\.", "g"), "-") + "-modal";
  }

  function addModal(name, description, category, githubUrl, blogPosts, doc) {
    var modalId = generateModalId(name);
    var modalBody = description;
    if (blogPosts != "") {
      modalBody += "<br/><br/><b>Blog Posts</b><br/>";
      modalBody += blogPosts;
    }
    var modal = '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '<h2 class="modal-title" id="myModalLabel">' + name + '</h2>' + buildCategoryLabel(category) +
      '</div>' +
      '<div class="modal-body">' +
      modalBody + '</div>' +
      '<div class="modal-footer">';
    if (doc != "") {
      modal = modal + '<a class="btn btn-primary" href="' + doc + '" target="_blank">Documentation</a>  ';
    }
    modal = modal + '<a class="btn btn-primary" href="' + githubUrl + '" target="_blank">View on GitHub</a>'
      '</div></div></div></div>';
    $("#modals").append(modal);
  }

  function buildCategoryLabel(category) {
    var categorMap = {
      "Data": "default",
      "Frameworks": "primary",
      "SysOps": "success",
      "Testing": "info",
      "Mobile": "warning",
      "Other": "danger"
    }
    return '<span class="label label-' + categorMap[category] + '">' + category + '</span>';
  }

  function buildLanguageLabel(language) {
    var languageMap = {
      "Ruby": "warning",
      "CSS": "primary",
      "JavaScript": "success",
      "C": "info",
      "Mobile": "warning",
      "Other": "danger"
    }
    return '<span style="font-size:14px;" class="label label-' + languageMap[language] + '">' + language + '</span>';
  }


  var isotopeData = "";
  var languages = {};
  var githubData = null;
  if (data.meta.status == 403) {
    githubData = cachedGithubApiResponse;
    console.log("Using a cached API response.");
  } else {
    githubData = data.data;
  }

  // sort repo on latest activity first - using pushed at
  githubData.sort(function(a,b){
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
  githubData.forEach(function(item) {
    var language = getLanguage(item.language);
    if (languages[language] == undefined) {
      languages[language] = language;
    }
    var category = getCategory(item.name);
    isotopeData +=
      '<div class="item ' + category.toLowerCase() + " " + language + ' col-lg-4 border-fade">' +
      '<h3 class="name">' + item.name + '</h3>' +
      '<button type="submit" class="btn_git btn-with-count js-toggler-target"> <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"> <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path> </svg>'+
      ' '+ item.stargazers_count +' Stars </button>&nbsp'+
       '<button type="submit" class="btn_git btn-with-count js-toggler-target"><svg aria-hidden="true" class="octicon octicon-repo-forked" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>'+
      ' '+ item.forks +' Forks </button>'+
      '<p class="size hidden">' + item.size + '</p>' +
      '<p class="forks hidden">' + item.forks + '</p>' +
      '<p class="watchers hidden">' + item.watchers_count + '</p>' +
      '<p>' + item.description + '</p>' +
       buildLanguageLabel(language) +
      '</div>';
    var doc;
    if (item.name in repoToDoc) {
      doc = repoToDoc[item.name];
    } else {
      doc = "";
    }
    addModal(item.name, item.description, category, item.html_url, getBlogposts(item.name), doc);
  });

  var container = $('#isotope-container');
  container.append(isotopeData);

  // initialize Isotope
  $("#isotope-container").isotope({
    // options
    itemSelector: '.item',
    layoutMode: 'masonry',
    getSortData: {
      forks: function(elem) {
        return parseInt($(elem).find(".forks").text(), 10);
      },
      size: function(elem) {
        return parseInt($(elem).find(".size").text(), 10);
      },
      watchers: function(elem) {
        return parseInt($(elem).find(".watchers").text(), 10);
      },
      name: function(elem) {
        return $(elem).find(".name").text();
      }
    }
  });

  // Modals
  $(".item").click(function() {
    var repo = $($(this).find("h3")[0]).html();
    var modal = generateModalId(repo);
    var modalSelector = "#" + modal;
    $(modalSelector).modal();
  });

  // Isotope filters
  $(".filter").click(function() {
    var selector = $(this).html().toLowerCase();
    if (selector == "all") {
      selector = "*";
    }
    else {
      selector = "." + selector;
    }
    $("#isotope-container").isotope({ filter: selector });
  });

  // Isotope sorting
  $(".sort").click(function(){
    var sortName = $(this).attr("data-option-value");
    var isAscending = false;
    if (sortName == "name") {
      isAscending = true;
    }
    $('#isotope-container').isotope({ sortBy : sortName, sortAscending: isAscending });
  });

  // Random color to project cards
  $(".border-fade").each(function(index) {
    var color = randomColor({
      luminosity: 'bright',
      format: 'rgb' // e.g. 'rgb(225,200,20)'
    });
    // Set random border color fo each project card
    $(this).css('box-shadow', `inset 0 0 0 4px ${color},0 0 1px rgba(0,0,0,0)`);

    // Mouse events for project cards
    $(this).on('mouseover', function(event) {
      $(this).css('box-shadow', `inset 0 0 0 6px #ddd,0 0 1px rgba(0,0,0,0)`);
    }).mouseout(function(event) {
      $(this).css('box-shadow', `inset 0 0 0 4px ${color},0 0 1px rgba(0,0,0,0)`);
    });
  });
}

$.ajax({
  dataType: 'json',
  url:'https://api.github.com/orgs/99XT/repos?page=1&per_page=100&callback=?',
  success: renderPage
});
