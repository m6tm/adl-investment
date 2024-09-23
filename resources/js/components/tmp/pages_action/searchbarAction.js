const { isEmpty } = require("lodash")

// Filter
$(".search-input .input").off('keyup')
window.search_is_ready = true
$(".search-input .input").on("keyup", function (e) {
  if (e.key !== 38 && e.key !== 40 && e.key !== 13) {
    if (e.key == 27) {
      $(".app-content").removeClass("show-overlay")
      $(".bookmark-input input").val("")
      $(".bookmark-input input").blur()
      $(".search-input input").val("")
      $(".search-input input").blur()
      $(".search-input").removeClass("open")
      if ($(".search-list").hasClass("show")) {
        $(this).removeClass("show")
        $(".search-input").removeClass("show")
      }
    }

    /**
     * @type {string} Define variables
     */
    var value = $(this)
      .val()
      .toLowerCase(), //get values of inout on keyup
      activeClass = "",
      bookmark = false,
      liList = $("ul.search-list li") // get all the list items of the search
    liList.remove()
    // To check if current is bookmark input
    if (
      $(this)
        .parent()
        .hasClass("bookmark-input")
    ) {
      bookmark = true
    }

    // If input value is blank
    if (!isEmpty(value)) {
      $(".app-content").addClass("show-overlay")

      // condition for bookmark and search input click
      if ($(".bookmark-input").focus()) {
        $(".bookmark-input .search-list").addClass("show")
      } else {
        $(".search-input .search-list").addClass("show")
        $(".bookmark-input .search-list").removeClass("show")
      }
      if (bookmark === false) {
        $(".search-input .search-list").addClass("show")
        $(".bookmark-input .search-list").removeClass("show")
      }

      var $startList = "",
        $otherList = "",
        $htmlList = "",
        $activeItemClass = "",
        $bookmarkIcon = "",
        a = 0

      // getting json data from file for search results
      let data = window.search_data;
      for (var i = 0; i < data.listItems.length; i++) {
        // if current is bookmark then give class to star icon
        if (bookmark === true) {
          activeClass = "" // resetting active bookmark class
          var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
            $arrList = ""
          // Loop to check if current seach value match with the bookmarks already there in navbar
          for (var j = 0; j < arrList.length; j++) {
            if (
              data.listItems[i].view ===
              arrList[j].firstChild.dataset.originalTitle
            ) {
              activeClass = " warning"
              break
            } else {
              activeClass = ""
            }
          }
          $bookmarkIcon =
            '<span class="float-right bookmark-icon bx bx-star' +
            activeClass +
            '"></span>'
        }
        // Search list item start with entered letters and create list
        if (
          data.listItems[i].view.toLowerCase().match(value.toLowerCase())
        ) {
          if (a === 0) {
            $activeItemClass = "current_item"
          } else {
            $activeItemClass = ""
          }
          $startList +=
            '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
            $activeItemClass +
            '">' +
            '<a class="d-flex align-items-center justify-content-between w-100" href=' +
            data.listItems[i].url +
            ">" +
            '<div class="d-flex justify-content-start">' +
            '<span class="mr-75 ' +
            data.listItems[i].icon +
            '" data-icon="' +
            data.listItems[i].icon +
            '"></span>' +
            "<span>" +
            `${data.listItems[i].name} > ${data.listItems[i].uri}` +
            "</span>" +
            "</div>" +
            $bookmarkIcon +
            "</a>" +
            "</li>"
          a++
        }
      }
      for (var i = 0; i < data.listItems.length; i++) {
        if (bookmark === true) {
          activeClass = "" // resetting active bookmark class
          var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
            $arrList = ""
          // Loop to check if current seach value match with the bookmarks already there in navbar
          for (var j = 0; j < arrList.length; j++) {
            if (
              data.listItems[i].view ===
              arrList[j].firstChild.dataset.originalTitle
            ) {
              activeClass = " warning"
            } else {
              activeClass = ""
            }
          }
          $bookmarkIcon =
            '<span class="float-right bookmark-icon bx bx-star' +
            activeClass +
            '"></span>'
        }
        // Search list item not start with letters and create list
        if (
          data.listItems[i].view.toLowerCase().match(value.toLowerCase())
        ) {
          if (a === 0) {
            $activeItemClass = "current_item"
          } else {
            $activeItemClass = ""
          }
          $otherList +=
            '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
            $activeItemClass +
            '">' +
            '<a class="d-flex align-items-center justify-content-between w-100" href=' +
            data.listItems[i].url +
            ">" +
            '<div class="d-flex justify-content-start">' +
            '<span class="mr-75 ' +
            data.listItems[i].icon +
            '" data-icon="' +
            data.listItems[i].icon +
            '"></span>' +
            "<span>" +
            `${data.listItems[i].name} > ${data.listItems[i].uri}` +
            "</span>" +
            "</div>" +
            $bookmarkIcon +
            "</a>" +
            "</li>"
          a++
        }
      }
      if ($startList == "" && $otherList == "") {
        $otherList =
          '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer">' +
          '<a class="d-flex align-items-center justify-content-between w-100">' +
          '<div class="d-flex justify-content-start">' +
          '<span class="mr-75 bx bx-error-circle"></span>' +
          "<span>No results found.</span>" +
          "</div>" +
          "</a>" +
          "</li>"
      }

      $htmlList = $startList.concat($otherList) // merging start with and other list
      $("ul.search-list").html($htmlList) // Appending list to <ul>
    } else {
      if (bookmark === true) {
        var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
          $arrList = ""
        for (var i = 0; i < arrList.length; i++) {
          if (i === 0) {
            $activeItemClass = "current_item"
          } else {
            $activeItemClass = ""
          }
          $arrList +=
            '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer">' +
            '<a class="d-flex align-items-center justify-content-between w-100" href=' +
            arrList[i].firstChild.href +
            ">" +
            '<div class="d-flex justify-content-start">' +
            '<span class="mr-75 ' +
            arrList[i].firstChild.firstChild.className +
            '"  data-icon="' +
            arrList[i].firstChild.firstChild.className +
            '"></span>' +
            "<span>" +
            arrList[i].firstChild.dataset.originalTitle +
            "</span>" +
            "</div>" +
            '<span class="float-right bookmark-icon bx bx-star warning"></span>' +
            "</a>" +
            "</li>"
        }
        $("ul.search-list").append($arrList)
      } else {
        // if search input blank, hide overlay
        if ($(".app-content").hasClass("show-overlay")) {
          $(".app-content").removeClass("show-overlay")
        }
        // If filter box is empty
        if ($(".search-list").hasClass("show")) {
          $(".search-list").removeClass("show")
        }
      }
    }
  }
})