new Konami("https://www.linkedin.com");

var renderPage = function(data) {
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
    if (blogPosts !== "") {
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
    if (doc !== "") {
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

  var isotopeData = "";
  var languages = {};
  var githubData = null;
  if (data.meta.status === 403) {
    githubData = cachedGithubApiResponse;
    console.log("Using a cached API response.");
  } else {
    githubData = data.data;
  }
  githubData = _.shuffle(githubData);
  githubData.forEach(function(item) {
    // Skip forked repos, as they are not directly owned by LinkedIn
    if (item.fork === true) {
      return;
    }
    var language = getLanguage(item.language);
    if (languages[language] === undefined) {
      languages[language] = language;
    }
    var category = getCategory(item.name);
    isotopeData +=
        '<div class="item ' + category.toLowerCase() + " " + language + ' col-lg-4 border-fade">' +
        '<h3 class="name">' + item.name + '</h3>' + buildCategoryLabel(category) + '<br><br>' +
        '<p class="size hidden">' + item.size + '</p>' +
        '<p class="forks hidden">' + item.forks + '</p>' +
        '<p class="watchers hidden">' + item.watchers_count + '</p>' +
        '<p>' + item.description + '</p>' +
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
    if (selector === "all") {
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
    if (sortName === "name") {
      isAscending = true;
    }
    $('#isotope-container').isotope({ sortBy : sortName, sortAscending: isAscending });
  });
}

$.ajax({
  dataType: 'json',
  url:'https://api.github.com/orgs/LinkedIn/repos?page=1&per_page=100&callback=?',
  success: renderPage
});
