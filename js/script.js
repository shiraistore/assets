$(function () {
  if (!$('.wrapper--product-list section.__list').hasClass('__list--row')) {
    $('.__block--pro-ranking .__title,.__product .__title').each(function () {
      var rankingTitle = $(this).html();
      rankingTitle = rankingTitle.replace(/　/g, '<br>');
      $(this).html(rankingTitle);
    });
  }

  $('#slide-menu-button,#slide-menu-blocker, #slide_box_menu .close').on('click', function () {
    if ($('footer #slide_box_menu').hasClass('off')) {
      $('footer #slide_box_menu').removeClass('off');
      if ($(window).width() <= 640) {
        var window_w = $(window).width() - 60;
      } else {
        var window_w = '50%';
      }

      //console.log(window_w);
      $('footer #slide_box_menu').animate({
        'marginLeft': window_w
      }, 300).addClass('on');
      $('#slide-menu-blocker').fadeIn('fast');
    } else {
      $('footer #slide_box_menu').addClass('off');
      $('footer #slide_box_menu').animate({
        'marginLeft': '0px'
      }, 300);
      $('#slide-menu-blocker').fadeOut('fast');
    }
  });

  $('#slide_box_menu .tab li').click(function () {
    var index = $('#slide_box_menu .tab li').index(this);
    $('#slide_box_menu .tab li').removeClass('active');
    $(this).addClass('active');
    $('#slide_menu section').removeClass('show').eq(index).addClass('show');
  });


  $('#slide_box_menu .tab #menu-page').click(function () {
    $.cookie('slide_open_flag', '0', {
      expires: 7,
      path: '/'
    });
  });

  $('#slide_box_menu .tab #menu-product').click(function () {
    $.cookie('slide_open_flag', '1', {
      expires: 7,
      path: '/'
    });
  });

  var menu_flag = $.cookie('slide_open_flag');

  if (menu_flag == 1) {
    var index = $('#slide_box_menu .tab li#menu-product').index(this);
    $('#slide_box_menu .tab li').removeClass('active');
    $('#slide_box_menu .tab li#menu-product').addClass('active');
    $('#slide_menu section').removeClass('show').eq(index).addClass('show');
  }

  if ($('body').hasClass('__is-member')) {
    var member_information1 = $('.__block--login.__is-member .__body .__name').text();
    //console.log(member_information1[1]);
    var member_information2 = $('.__block--login.__is-member .__body .__point').html();
    //console.log(member_information1);

    if (member_information1[1] != undefined) {
      $('#slide_box_menu-inner .name_point, #hnav .name_point').html('<div><span>' + member_information1 + '</span>' + member_information2 + '</div><div><a href="https://shirai-businessonline.com/logout.php" class="opacity btn-logout">ログアウト</a></div>');
    }


    $('#slide_box_menu-inner .name_point').after('<ul class="member_menu"><li><a href="/page/documentdownload"><img src="https://shirai-businessonline.com/uploads/rv_common/menu-icon_image.png">画像＆資料<br>ダウンロード</a></li><li><a href="/uploads/zaiko/zaiko.zip"><img src="https://shirai-businessonline.com/uploads/rv_common/menu-icon_stock.png">在庫表<br>ダウンロード</a></li></ul>');
  }


  $('aside .aside-inner .__block--calendar').insertBefore('#footer-inner');
  $('.__block--calendar').prepend('<h3>営業日カレンダー</h3>');
  $('.__block--calendar ul li:last-child').append('<p><span></span>：休業日</p>');

  $('section.__block.__block--category .__item--4').after('<li class="__item __item--text __item--title">カテゴリーから探す</h3>');

  var productSetTableWidth = $('.p-product-set').width();

  $(".p-product-set tbody tr").each(function () {
    if ($(this).html().indexOf('組立宅配サービス') != -1) {
      var text = $(this).html();
      text = text.replace('宅配', 'オプション');
      $(this).html(text);
      var nameText = $(this).children('.__description').children('.__name').html();
      nameText = nameText + ' <span class="comment-open">？</span><div class="comment"><span class="comment-close">×</span>専門スタッフが組み立てを行い、お届けします。<br>組立料金と追加送料が含まれています。</div>'
      //console.log(nameText);
      $(this).children('.__description').children('.__name').html(nameText);
    }
    if ($(this).html().indexOf('組立設置サービス') != -1) {
      var text = $(this).html();
      text = text.replace('宅配', 'オプション');
      $(this).html(text);
      var nameText = $(this).children('.__description').children('.__name').html();
      nameText = nameText + ' <span class="comment-open">？</span><div class="comment"><span class="comment-close">×</span>専門スタッフが組み立てを行い、ご指定の場所（部屋）に設置します。また、梱包材を回収し処分します。<br>組立料金と追加送料・設置料金が含まれています。</div>'
      //console.log(nameText);
      $(this).children('.__description').children('.__name').html(nameText);
    }
  });

  $('.comment-open').click(function () {
    $(this).next('.comment').slideToggle();
  });

  $('.comment-close').click(function () {
    $(this).parent('.comment').slideUp();
  });

  $("#button").bind("click", function () {
    //console.log('test');

    var abc, def;
    abc = $("#item1").val();
    def = $("#item2").val();
    re = new RegExp(abc);
    re2 = new RegExp(def);

    $(".p-product-set tbody tr").each(function () {
      var txt = $(this).find("td:eq(0)").html();
      if (txt.match(re) != null) {
        if (txt.match(re2) != null) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else {
        if (txt.indexOf('サービス') != -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }
    });
  });

  $("#button2").bind("click", function () {
    $(".p-product-set tr").show();
    $('#item1 option:eq(0)').prop('selected', true);
    $('#item2 option:eq(0)').prop('selected', true);
  });

  // for SP
  /*
  $("#button").bind("click", function () {

    var abc, def;
    abc = $("#item1").val();
    def = $("#item2").val();
    re = new RegExp(abc);
    re2 = new RegExp(def);

    $(".p-product-set .__item").each(function () {
      var txt = $(this).find("table").html();
      if (txt.match(re) != null) {
        if (txt.match(re2) != null) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else {
        if (txt.indexOf('サービス') != -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }
    });
  });

  $("#button2").bind("click", function () {
    $(".p-product-set .__item").show();
  });
  */

  if ($j('.p-product-set .__shipping').length) {
    $j('.p-product-set .__shipping').each(function () {
      $j(this).children('dt').text('送料単価');
      var deliveryPoint = $j(this).children('dd').text();
      deliveryPoint = deliveryPoint.replace('区分', '');
      if (deliveryPoint <= 97) {
        deliveryPoint = deliveryPoint * 200;
        deliveryPoint = String(deliveryPoint).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        $j(this).children('dd').text(deliveryPoint + '円');
      } else {
        $j(this).children('dd').text('別途お見積もり');
      }
    });
  }

  if ($j('.p-cart .__description .__shipping-size').length) {
    $j('.p-cart .__description .__shipping-size').each(function () {
      $j(this).children('dt').text('送料単価');
      var deliveryPoint = $j(this).children('dd').text();
      deliveryPoint = deliveryPoint.replace('区分', '');
      if (deliveryPoint <= 97) {
        deliveryPoint = deliveryPoint * 200;
        deliveryPoint = String(deliveryPoint).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        $j(this).children('dd').text(deliveryPoint + '円');
      } else {
        $j(this).children('dd').text('別途お見積もり');
      }
    });
  }

  if ($j('.p-cart .__total-count').length) {
    $j('.p-cart .__total-count .__shipping-size').each(function () {
      $j(this).children('dt').text('合計送料');
      var deliveryPoint = $j(this).children('dd').text();
      deliveryPoint = deliveryPoint.replace('区分', '');
      if (deliveryPoint <= 97) {
        deliveryPoint = deliveryPoint * 200;
        deliveryPoint = String(deliveryPoint).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        $j(this).children('dd').text(deliveryPoint + '円');
      } else {
        $j(this).children('dd').text('ご注文後に別途お見積もり');
      }
    });
  }

  if ($j('body').hasClass('body-regist')) {
    $j('.__row-paid th').html('Paid<div id="about-paid"><span id="about-paid-title">Paidとは？</span><span id="about-paid-body">掛売り（後払い）ができる決済サービスです。</span></div>');
    $j('p:contains("例) 実店舗、ネットショップ等 複数可")').each(function(){
        var businessTypeExample = $(this).text();
        $(this).html(
          businessTypeExample.replace("例) 実店舗、ネットショップ等 複数可","例) 実店舗等 複数可")
      );
    });
  }



  var urlParam = location.search.replace("?wh_type=", "");
  var linkValue = "https://shirai-businessonline.com/product.php?id="
  //console.log(urlParam);
  var array11 = ["1743", "1749", "1737", "1815", "1821", "1809", "1761", "1767", "1755", "1833", "1839", "1827"],
    array12 = ["1744", "1750", "1738", "1816", "1822", "1810", "1762", "1768", "1756", "1834", "1840", "1828"],
    array13 = ["1745", "1751", "1739", "1817", "1823", "1811", "1763", "1769", "1757", "1835", "1841", "1829"],
    array14 = ["1746", "1752", "1740", "1818", "1824", "1812", "1764", "1770", "1758", "1836", "1842", "1830"],
    array15 = ["1747", "1753", "1741", "1819", "1825", "1813", "1765", "1771", "1759", "1837", "1843", "1831"],
    array16 = ["1748", "1754", "1742", "1820", "1826", "1814", "1766", "1772", "1760", "1838", "1844", "1832"],
    array21 = ["1239", "1275", "1203", "1509", "1545", "1473", "1383", "1419", "1347", "1653", "1689", "1617"],
    array22 = ["1240", "1276", "1204", "1510", "1546", "1474", "1384", "1420", "1348", "1654", "1690", "1618"],
    array23 = ["1241", "1277", "1205", "1511", "1547", "1475", "1385", "1421", "1349", "1655", "1691", "1619"],
    array24 = ["1242", "1278", "1206", "1512", "1548", "1476", "1386", "1422", "1350", "1656", "1692", "1620"],
    array25 = ["1243", "1279", "1207", "1513", "1549", "1477", "1387", "1423", "1351", "1657", "1693", "1621"],
    array26 = ["1244", "1280", "1208", "1514", "1550", "1478", "1388", "1424", "1352", "1658", "1694", "1622"],
    array31 = ["1245", "1281", "1209", "1515", "1551", "1479", "1389", "1425", "1353", "1659", "1695", "1623"],
    array32 = ["1246", "1282", "1210", "1516", "1552", "1480", "1390", "1426", "1354", "1660", "1696", "1624"],
    array33 = ["1247", "1283", "1211", "1517", "1553", "1481", "1391", "1427", "1355", "1661", "1697", "1625"],
    array34 = ["1248", "1284", "1212", "1518", "1554", "1482", "1392", "1428", "1356", "1662", "1698", "1626"],
    array35 = ["1249", "1285", "1213", "1519", "1555", "1483", "1393", "1429", "1357", "1663", "1699", "1627"],
    array36 = ["1250", "1286", "1214", "1520", "1556", "1484", "1394", "1430", "1358", "1664", "1700", "1628"],
    array41 = ["1251", "1287", "1215", "1521", "1557", "1485", "1395", "1431", "1359", "1665", "1701", "1629"],
    array42 = ["1252", "1288", "1216", "1522", "1558", "1486", "1396", "1432", "1360", "1666", "1702", "1630"],
    array43 = ["1253", "1289", "1217", "1523", "1559", "1487", "1397", "1433", "1361", "1667", "1703", "1631"],
    array44 = ["1254", "1290", "1218", "1524", "1560", "1488", "1398", "1434", "1362", "1668", "1704", "1632"],
    array45 = ["1255", "1291", "1219", "1525", "1561", "1489", "1399", "1435", "1363", "1669", "1705", "1633"],
    array46 = ["1256", "1292", "1220", "1526", "1562", "1490", "1400", "1436", "1364", "1670", "1706", "1634"],
    array51 = ["1257", "1293", "1221", "1527", "1563", "1491", "1401", "1437", "1365", "1671", "1707", "1635"],
    array52 = ["1258", "1294", "1222", "1528", "1564", "1492", "1402", "1438", "1366", "1672", "1708", "1636"],
    array53 = ["1259", "1295", "1223", "1529", "1565", "1493", "1403", "1439", "1367", "1673", "1709", "1637"],
    array54 = ["1260", "1296", "1224", "1530", "1566", "1494", "1404", "1440", "1368", "1674", "1710", "1638"],
    array55 = ["1261", "1297", "1225", "1531", "1567", "1495", "1405", "1441", "1369", "1675", "1711", "1639"],
    array56 = ["1262", "1298", "1226", "1532", "1568", "1496", "1406", "1442", "1370", "1676", "1712", "1640"],
    array61 = ["1263", "1299", "1227", "1533", "1569", "1497", "1407", "1443", "1371", "1677", "1713", "1641"],
    array62 = ["1264", "1300", "1228", "1534", "1570", "1498", "1408", "1444", "1372", "1678", "1714", "1642"],
    array63 = ["1265", "1301", "1229", "1535", "1571", "1499", "1409", "1445", "1373", "1679", "1715", "1643"],
    array64 = ["1266", "1302", "1230", "1847", "1848", "1846", "1410", "1446", "1374", "1850", "1851", "1849"],
    array65 = ["1267", "1303", "1231", "1537", "1573", "1501", "1411", "1447", "1375", "1681", "1717", "1645"],
    array66 = ["1268", "1304", "1232", "1538", "1574", "1502", "1412", "1448", "1376", "1682", "1718", "1646"],
    array71 = ["1311", "1317", "1305", "1581", "1587", "1575"],
    array72 = ["1312", "1318", "1306", "1582", "1588", "1576"],
    array73 = ["1313", "1319", "1307", "1583", "1589", "1577"],
    array74 = ["1314", "1320", "1308", "1584", "1590", "1578"],
    array75 = ["1315", "1321", "1309", "1585", "1591", "1579"],
    array76 = ["1316", "1322", "1310", "1586", "1592", "1580"],
    array81 = ["1329", "1335", "1323", "1599", "1605", "1593", "1455", "1461", "1449", "1725", "1731", "1719"],
    array82 = ["1330", "1336", "1324", "1600", "1606", "1594", "1456", "1462", "1450", "1726", "1732", "1720"],
    array83 = ["1331", "1337", "1325", "1601", "1607", "1595", "1457", "1463", "1451", "1727", "1733", "1721"],
    array84 = ["1332", "1338", "1326", "1602", "1608", "1596", "1458", "1464", "1452", "1728", "1734", "1722"],
    array85 = ["1333", "1339", "1327", "1603", "1609", "1597", "1459", "1465", "1453", "1729", "1735", "1723"],
    array86 = ["1334", "1340", "1328", "1604", "1610", "1598", "1460", "1466", "1454", "1730", "1736", "1724"];
  if (urlParam == 11) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>60cm</span>");
    $.each(array11, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 12) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>60cm</span>");
    $.each(array12, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 13) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>60cm</span>");

    $.each(array13, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 14) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>60cm</span>");
    $.each(array14, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 15) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>60cm</span>");
    $.each(array15, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 16) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>60cm</span>");
    $.each(array16, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 21) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>90cm</span>");
    $.each(array21, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 22) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>90cm</span>");
    $.each(array22, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 23) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>90cm</span>");
    $.each(array23, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 24) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>90cm</span>");
    $.each(array24, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 25) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>90cm</span>");
    $.each(array25, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 26) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>90cm</span>");
    $.each(array26, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 31) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>120cm</span>");
    $.each(array31, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 32) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>120cm</span>");
    $.each(array32, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 33) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>120cm</span>");
    $.each(array33, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 34) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>120cm</span>");
    $.each(array34, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 35) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>120cm</span>");
    $.each(array35, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 36) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>120cm</span>");
    $.each(array36, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 41) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>150cm</span>");
    $.each(array41, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 42) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>150cm</span>");
    $.each(array42, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 43) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>150cm</span>");
    $.each(array43, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 44) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>150cm</span>");
    $.each(array44, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 45) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>150cm</span>");
    $.each(array45, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 46) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>150cm</span>");
    $.each(array46, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 51) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>180cm</span>");
    $.each(array51, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 52) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>180cm</span>");
    $.each(array52, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 53) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>180cm</span>");
    $.each(array53, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 54) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>180cm</span>");
    $.each(array54, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 55) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>180cm</span>");
    $.each(array55, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 56) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>180cm</span>");
    $.each(array56, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 61) {
    $(".selected-text").html("幅<span>15cm～34cm</span> 高さ<span>198cm</span>");
    $.each(array61, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 62) {
    $(".selected-text").html("幅<span>35cm～44cm</span> 高さ<span>198cm</span>");
    $.each(array62, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 63) {
    $(".selected-text").html("幅<span>45cm～60cm</span> 高さ<span>198cm</span>");
    $.each(array63, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 64) {
    $(".selected-text").html("幅<span>61cm～70cm</span> 高さ<span>198cm</span>");
    $.each(array64, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 65) {
    $(".selected-text").html("幅<span>71cm～80cm</span> 高さ<span>198cm</span>");
    $.each(array65, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 66) {
    $(".selected-text").html("幅<span>81cm～90cm</span> 高さ<span>198cm</span>");
    $.each(array66, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 71) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>15cm～34cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array71, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 72) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>35cm～44cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array72, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 73) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>45cm～60cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array73, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 74) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>61cm～70cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array74, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 75) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>71cm～80cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array75, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 76) {
    $(".condition-display").css("display", "none");
    $(".selected-text").html("【上置き】幅<span>81cm～90cm</span> 高さ<span>36.5～58.5cm</span>");
    $.each(array76, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 81) {
    $(".selected-text").html("【追加棚板】幅<span>15cm～34cm</span>");
    $.each(array81, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 82) {
    $(".selected-text").html("【追加棚板】幅<span>35cm～44cm</span>");
    $.each(array82, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 83) {
    $(".selected-text").html("【追加棚板】幅<span>45cm～60cm</span>");
    $.each(array83, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 84) {
    $(".selected-text").html("【追加棚板】幅<span>61cm～70cm</span>");
    $.each(array84, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 85) {
    $(".selected-text").html("【追加棚板】幅<span>71cm～80cm</span>");
    $.each(array85, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  } else if (urlParam == 86) {
    $(".selected-text").html("【追加棚板】幅<span>81cm～90cm</span>");
    $.each(array86, function (i, value) {
      $(".link" + i).attr("href", linkValue + value);
    });
  }

  if ($('body').hasClass('body-regist-form')) {
    $('.c-form table th').each(function () {
      if ($(this).text().indexOf('サイト利用契約区分') != -1) {
        //$(this).parents('tr').addClass('__row-custom3');
      }
    });
    $('.__row-custom3').insertBefore('.__row-comp_name');


    $('.c-button-submit').css('display', 'none');

    var selectCheck = $('.__row-custom3 td select option:selected').val();
    if (!selectCheck == '') {
      $('.c-button-submit').css('display', 'inline-block');
    }

    var useContractDivision = $('.__row-custom3');
    $('.cus_table tbody').prepend(useContractDivision);

    $('.__row-custom3 td').append('<div id="case1" class="contract-box" style="display:none;"><div id="sales-contract"><div id="sales-contract-box"><h3>商品売買契約</h3><p>株式会社白井産業（以下、「甲」という。）とユーザー（以下、「乙」という。）は、甲の本Webサイト上（以下「本サイト」という。）で甲の利用規約に基づき行う甲乙間の商品の売買に関し、以下の通り契約（以下、「本契約」という。）を締結する。</p><h4>第１条（目的）</h4><p>本契約は、本サイトを通じて、甲が製造または販売する商品（以下、「本商品」という。）を乙に売り渡し、乙が買い受ける条件を定めること（以下本売買」という。）を目的とする。</p><h4>第２条（本商品の注文方法）</h4><ol><li>乙は、本サイト上の画面より必要事項を入力し、甲へ送信する方法により、本商品の売買を申込む。</li><li>第１項の定めにかかわらず、甲が特に必要と認める商品については、別途甲が定める手続により申込む。</li><li>ログインIDおよびパスワードを用いて行われた本Webサイトの注文については、乙の有効な意思表示であるものとし、正当な注文とみなす。</li><li>乙は、甲が注文を受付け、甲の審査（カード決済の場合はカード会社等の審査）を通過して在庫や納品日等の必要事項が確認され、甲において受注処理を確定したときをもって、甲との間で売買契約（サービスに関する契約を含む。以下同様）が成立することをあらかじめ了承する。</li><li>乙は、天変地異や長期的に商品の入荷が見込めない等の特段の事情により、甲が、乙から受け付けたご注文の商品を届けられない場合、及び注文を取消す場合があることをあらかじめ承諾する。</li><li>乙が注文をするにあたり、甲に提供される情報に乙の社員等の個人情報が含まれる場合は、乙において、当該個人に事前にその旨を通知し、甲に個人情報を提供することについての同意を取得しなければならない。なお、甲は、乙が甲に提供する一切の情報が、各種法令、規制、ガイドライン等に従い乙が適法に取得したものであるものとして取扱う。</li></ol><h4>第３条（代金、配送料、組立費及び設置費等）</h4><ol><li>本サイト上に、乙の売買申込み時点において掲載される商品の表示価格をもって、本商品の売買代金とする。</li><li>乙は、本商品の代金とは別に、甲の事業所から乙が指定する受取場所までの配送料を負担する。</li><li>本サイト上に、乙の売買申込み時点において掲載される配送料の表示価格をもって、本商品の配送料とする。	</li><li>本サイト上に掲載される商品、配送料等の表示価格には、特に定めのない限り、消費税が含まれている。</li><li>本商品につき、乙が組立サービス及び組立設置サービス（第６条）を利用した場合には、乙は、別途甲が見積もった組立費及び設置費を負担する。</li><li>1回の注文に複数の本商品が含まれる場合であっても、注文にオーダーメイド・受注生産品等が含まれるときには、乙は、納品日が異なりうること、それぞれの本商品ごとに配送料が発生することを予め承諾する。</li></ol><h4>第４条（代金等の支払い）</h4><ol><li>本商品の代金および配送料等の支払条件は、乙が、本商品の売買申し込み時に選択した方法による</li><li>乙は、本サイト上において乙に指定された期日までに、甲に対し、前項で選択した方法により代金を送金する。ただし、送金に要する手数料は乙の負担とする。</li><li>乙は、領収書若しくは納品書、又はその両方の発行を希望する場合には、本商品の注文時に、甲に対して、所定の方法で申し出ることとする。甲は、それらを乙が会員登録時に申し出たメールアドレスに、PDF形式で送ることとする。</li><li>乙が支払期日までに本商品の代金及び配送料等の全部又は一部を支払わないときは、乙は甲に対し、支払期日の翌日から起算して支払済みに至るまで年14.6％の割合の遅延損害金を支払う。</li></ol><h4>第５条（所要日数）</h4><ol><li>本商品の発送及び到着までの所要日数は、注文商品、配送方法（組立宅配、組立設置宅配）、配送先、注文時間、甲の営業・休業の別等によって異なることを、乙は予め承諾する。</li><li>甲は、本サイト上に、乙による注文後、甲が本商品を発送するまでに要する期間の目安を記載する。</li><li>注文時の注文内容や所定の項目に不備若しくは誤入力等があり、又は登録事項に変更があったにもかかわらず変更登録が完了していないため、甲において通常の受注処理ができない場合、また交通事情等運送上の理由、年末年始、中元時期、夏期休暇中、悪天候、その他の事情により、「お届けについて」記載の日時までに届けることができない場合があることを、乙はあらかじめ了承する。甲は、それによって生じた責任について、乙又は第三者に対し、何ら賠償の義務を負わない。</li><li>乙のインターネット接続環境により、乙からの注文の送信時刻と甲での受信時刻にタイムラグが生じた場合、甲での受信時刻をもって乙の注文時刻とする。</li></ol><h4>第６条（本商品の引渡し）</h4><ol><li>甲は、乙による代金全額の支払いを確認した後、甲指定の運送業者に委託して、乙が本サイトを通じて指定する受取場所（以下「本送付先」という。）に本商品を配達する方法により引き渡す。</li><li>乙による本送付先の記載が不十分である場合、本送付先の屋号・会社名などを建物外観や表札から確認できない場合は、本商品を届けることができない場合があること、及び再配達による配送料が別途発生することを乙は予め承諾する。</li><li>引渡しは原則として本配送先の建物専有部分内にて行うものとし、乙は、建物専有部分外や登録以外の場所（建物外観から商品お届け先の屋号・会社名が同一であることを確認できる場合を除く。）で本商品を引渡す場合は、受け取る者の身分確認（免許証・パスポート等の提示を求め、住所・氏名・登録番号等を控える等）を行う場合があること、及び確認が取れない場合には本商品の引き渡しができないことをあらかじめ了承する。</li><li>甲は、前２項の場合及び乙又は乙の指定する者が本商品の受領に応じない場合その他乙の都合で商品お届け先への引渡しができない場合において、甲が要請したにもかかわらず、１週間以内に、乙が配送可能な本送付先の住所を甲に対して通知しない場合には、甲は、本商品を乙の住所に送付して引き渡す、又は本売買契約を解除することができる。なお、乙は、甲が本商品の住所に送付した場合、本商品の受領拒絶ができないこと、及び再配達による配送料を乙が負担することを予め承諾する。</li></ol><h4>第７条（受入検査）</h4><ol><li>乙は、目的物の引渡し後ただちに、受入検査を行う。納入後５営業日以内に乙からなんらの通知がない場合には、かかる目的物は受入検査に合格したものとみなす。</li><li>乙は、受入検査の結果目的物に数量不足又は外観上明らかな瑕疵がある場合には、納入後５営業日以内に書面又は電子メールにより不足の数量又は瑕疵の内容を明らかにして甲に通知する。</li><li>甲は、乙より前項の通知に基づき数量不足又は外観上明らかな瑕疵があると甲が認めた場合、甲の選択に従い、速やかに代替品又は不足分の納入を行う。</li><li>乙は、受入検査により不合格となった目的物について、その瑕疵が些細な不備によるものであり、合理的に使用可能と認められるときは、代金を減額してこれを引き取ることができる。この場合の目的物の金額については、甲乙間で別途協議する。</li></ol><h4>第８条（危険負担及び所有権移転）</h4><p>本商品の危険負担は第６条に基づく引渡しが完了した時点で甲から乙に移転し、本商品の所有権は、前条による受入検査が完了した時点（第１項後段により合格とみなされた場合を含む。）に、甲から乙に移転する。</p><h4>第９条（品質保証）</h4><p>甲は、本商品が注文時にWebサイトに掲載されている仕様に合致することのみ保証し、それ以外には明示又は黙示にかかわらず一切の保証を行わない。</p><h4>第１０条（免責及び損害賠償）</h4><ol><li>甲は、乙その他の第三者に発生した機会逸失、業務の中断その他いかなる損害（間接損害や逸失利益も含む。）に対して、甲がかかる損害の可能性を事前に通知されていたとしても、一切の責任を負わない。</li><li>本商品のお届け先への配送に際して、配送者または配送業者の過失により乙又は乙指定の受取人（以下、「乙ら」という。）が人身傷害または物的損害を被った場合には、甲は、当該過失行為から通常生ずべき実損害額の範囲内で乙に賠償する。なお、乙らは当該配送者または配送業者に対して直接損害賠償を請求することができ、甲は、配送業者をして乙らに賠償させることがある。</li><li>第２項の場合を除き、甲又は配送業者の過失により乙らに損害が生じた場合の甲の賠償責任は、当該過失行為から通常生ずべき実損害額の範囲内とし、かつ、いかなる場合でも当該注文にかかる商品の代金額（消費税を含む）を上限とする。</li></ol><h4>第１１条（知的財産権）</h4><ol><li>甲は、乙に引き渡す本商品及びその製造方法について、第三者の知的財産権を侵害しないことを保証するものではない 。</li><li>万一、本商品又はその製造方法に関して第三者の知的財産権に抵触する問題が発生し、又は発生するおそれがあるときは、甲又は乙は、相手方に対しただちにその旨を通知し、甲乙協議の上当該問題を解決する。</li></ol><h4>第１２条（製造物責任）</h4><ol><li>本商品の欠陥により、第三者の生命、身体又は財産に損害が生じたとき又はそのおそれが生じたときは、甲又は乙は、ただちにその旨を相手方に通知し、協力して問題解決に努める。</li><li>本商品の欠陥により第三者に対して損害賠償責任が発生した場合の賠償金額の分担については、甲乙間で協議する。</li></ol><h4>第１３条（返品）</h4><ol><li>乙は、甲による発送手続後は、注文の取消し及び変更はできない。</li><li>前項の規定にかかわらず、乙は、オーダーメイド商品を注文した場合には、注文の取消し及び変更はできない。</li></ol><h4>第１４条（期限の利益の喪失及び契約の解除）</h4><ol><li>乙が以下のいずれかの事由に当たると甲において判断した場合、何らの催告を要することなく、乙は甲に対して負担する債務の全てにつき期限の利益を失う。<ol><li>本契約のいずれかの条項に違反した場合</li><li>登録事項に虚偽の事実があることが判明した場合</li><li>支払停止若しくは支払不能となり、又は破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合</li><li>第４条の規定による代金の支払いを遅滞した場合</li><li>その他相手方に対して著しい不信行為があり、売買を継続するのが不適当であると判断した場合</li></ol></li><li>前項の場合、甲は当該商品の引渡義務を免れるとともに、乙に対して、損害賠償を請求することができる。</li></ol><h4>第１５条（責任制限）</h4><ol><li>第７条及び第１０条は、第１２条に規定する場合を除き、目的物の瑕疵に関する甲の責任の一切を規定したものであり、その他の法令上の瑕疵担保責任及び債務不履行責任に代わる。</li><li>甲の責任は、乙が直接かつ現実に被った損害に対する責任に限定される。</li></ol><h4>第１６条（苦情処理等）</h4><p>甲から購入し、乙が販売する商品の瑕疵、破損、アフターサービスの苦情、または購入の取消しや解約等に関するトラブルは、乙とその購入者との間で解決するものとし、甲は責任を負わない。ただし、製造物責任に係る損害賠償責任については、この限りではない。</p><h4>第１７条（秘密保持）</h4><p>甲及び乙は、本契約に基づき知りえた相手方の営業上、技術上、業務上の一切の情報を、事前に相手方の書面による承諾を得ることなく第三者に開示・漏洩し、又は本契約を履行する目的以外に利用してはならない。ただし、次の各号のいずれかに該当するものはこの限りではない。</p><ol><li>受領したとき既に自らが正当に保持又は了知していた情報</li><li>受領したとき既に公知であった情報又は自らの責任によることなく公知となった情報</li><li>正当な権限を有する第三者から守秘義務を伴わず入手した情報</li><li>相手方から開示を受けた情報を利用することなく独自に開発した情報</li></ol><h4>第１８条（反社会的勢力との関係排除）</h4><ol><li>甲および乙は、次の各号に定める事項を表明し、保証する。<ol><li>自己および自己の役員並びに従業員が反社会的勢力でないこと、また反社会的勢力でなかったこと</li><li>自己および自己の役員並びに従業員が、自己の不当な利得その他目的の如何を問わず、反社会的勢力の威力等を利用しないこと</li><li>自己および自己の役員並びに従業員が反社会的勢力に対して資金を提供するなど、反社会的勢力の維持運営に協力しないこと</li><li>自己および自己の役員並びに従業員が反社会的勢力と社会的に非難されるべき関係を有しないこと</li><li>自己および自己の役員並びに従業員が自らまたは第三者を利用して、相手方に対し暴力的な要求行為、法的な責任を超えた不当な要求を行い、相手方の名誉や信用を毀損せず、また、相手方の業務を妨害しないこと</li></ol></li><li>甲および乙は前項各号に違反する事実が判明した場合には、相手方に直ちに通知する。</li><li>甲または乙は相手方が本条に違反した場合は、何らの通知催告を要せず、直ちに本契　約の全部または一部を解除することができる。</li><li>甲または乙は、相手方が本条の規定に違反したことにより損害を被った場合、相手方に対し、前項に基づく契約解除にかかわらず当該損害について本契約に基づく損害賠償を請求できる。</li></ol><h4>第１９条（譲渡禁止）</h4><p>乙は、本契約上の地位並びに本契約又は個別契約から生じた権利及び義務を甲の事前の書面による承諾なく第三者に譲渡してはならない。</p><h4>第２０条（相殺）</h4><p>甲が乙に対し金銭債務を負担しているときは、甲の乙に対する金銭債権（本契約に基づく債権を含む。）と金銭債務は、履行期の到来していると否とにかかわらず相殺適状となり、甲はいつでも任意に対当額をもって相殺できる。</p><h4>第２１条（規定外事項）</h4><p>本契約に定めのない事項または本契約の各条項の解釈に疑義が生じたときには、甲と乙は誠意をもって協議し、円満解決を図る。</p><h4>第２２条（準拠法）</h4><p>本契約は日本法を準拠法とし、かつ、同法に従い解釈される。</p><h4>第２３条（裁判管轄）</h4><p>本契約に関する一切の紛争については、静岡地方裁判所をもって第一審の専属的合意管轄裁判所とする。</p></div></div><div><a href="https://shirai-businessonline.com/page/userpolicy" target="_blank" class="case1-use">利用規約</a>と<a href="https://shirai-businessonline.com/page/privacy" target="_blank" class="case1-privacy">プライバシーポリシー</a>を必ずご確認の上、同意ください。<br><span style="color:#ff0000">※ご確認いただかないとチェックできません。</span></div><label class="contract-area"><input id="case1-contract" name="case1-contract" type="checkbox" value="1"> 利用規約とプライバシーポリシー、及び売買契約に同意する</label><label class="contract-area"><input id="case1-checkEC" name="case1-checkEC" type="checkbox" value="1"> ネットショップ専業小売業ではありません</label></div><div id="case2" class="contract-box" style="display:none;">売買契約はお済みですか？<br><label><input id="case2-contract" type="radio" name="case2-contract" value="1"> 契約済み</label>　<label><input type="radio" name="case2-contract" value="0"> 未契約</label><div id="case2-1" class="contract-box-inner" style="display:none;"><a href="https://shirai-businessonline.com/page/userpolicy" target="_blank" class="case2-1-use">利用規約</a>と<a href="https://shirai-businessonline.com/page/privacy" target="_blank" class="case2-1-privacy">プライバシーポリシー</a>を必ずご確認の上、同意ください。<br><span style="color:#ff0000">※ご確認いただかないとチェックできません。</span><br><label class="contract-area"><input id="case2-1-contract" name="case2-1-contract" type="checkbox" value="1"> 利用規約とプライバシーポリシーに同意する</label></div><br><div id="case2-2" class="contract-box-inner" style="display:none;">こちらより<a href="https://shirai-businessonline.com/contact.php?subject=売買契約について">お問い合わせ</a>ください。</div></div><div id="case3" class="contract-box" style="display:none;"><a href="https://shirai-businessonline.com/page/userpolicy" target="_blank" class="case3-use">利用規約</a>と<a href="https://shirai-businessonline.com/page/privacy" target="_blank" class="case3-privacy">プライバシーポリシー</a>を必ずご確認の上、同意ください。<br><span style="color:#ff0000">※ご確認いただかないとチェックできません。</span><br><label class="contract-area"><input id="case3-contract" name="case3-contract" type="checkbox" value="1"> 利用規約とプライバシーポリシーに同意する</label></div>');


    $('.__row-custom3 td select').change(function () {
      var contractVal = $(this).val();
      if (contractVal == 'case1') {
        $('#case1').slideDown();
        $('#case2').slideUp();
        $('#case3').slideUp();
        $('#case2-1').slideUp();
        $('#case2-2').slideUp();
        $('#case2 input').prop('checked', false);
        $('#case3 input').prop('checked', false);
        $('.c-button-submit').css('display', 'none');
      } else if (contractVal == 'case2') {
        $('#case1').slideUp();
        $('#case2').slideDown();
        $('#case3').slideUp();
        $('#case2-1').slideUp();
        $('#case2-2').slideUp();
        $('#case1 input').prop('checked', false);
        $('#case3 input').prop('checked', false);
        $('.c-button-submit').css('display', 'none');
      } else if (contractVal == 'case3') {
        $('#case1').slideUp();
        $('#case2').slideUp();
        $('#case3').slideDown();
        $('#case2-1').slideUp();
        $('#case2-2').slideUp();
        $('#case1 input').prop('checked', false);
        $('#case2 input').prop('checked', false);
        $('.c-button-submit').css('display', 'none');
      } else {
        $('#case1').slideUp();
        $('#case2').slideUp();
        $('#case3').slideUp();
        $('#case2-1').slideUp();
        $('#case2-2').slideUp();
        $('#case1 input').prop('checked', false);
        $('#case2 input').prop('checked', false);
        $('#case3 input').prop('checked', false);
        $('.c-button-submit').css('display', 'none');
      }
    });

    $('.__row-custom3 td input[name="case2-contract"]').change(function () {
      var case2ContractVal = $(this).val();
      if (case2ContractVal == '1') {
        $('#case2-1').slideDown();
        $('#case2-2').slideUp();
      } else if (case2ContractVal == '0') {
        $('#case2-1').slideUp();
        $('#case2-2').slideDown();
      } else {
        $('#case2-1').slideUp();
        $('#case2-2').slideUp();
      }
    });

    var case1_use_flag = 0,
      case1_privacy_flag = 0;

    $('.case1-use').click(function () {
      case1_use_flag = 1;
    });

    $('.case1-privacy').click(function () {
      case1_privacy_flag = 1;
    });

    $('#case1-contract').click(function () {
      //console.log('case1_use_flag:' + case1_use_flag);
      //console.log('case1_privacy_flag:' + case1_privacy_flag);
      if (case1_use_flag == 0 && case1_privacy_flag == 0) {
        alert('利用規約とプライバシーポリシーをご確認ください。');
        $('#case1-contract').prop('checked', false);
      } else if (case1_use_flag == 0 && case1_privacy_flag == 1) {
        alert('利用規約をご確認ください。');
        $('#case1-contract').prop('checked', false);
      } else if (case1_use_flag == 1 && case1_privacy_flag == 0) {
        alert('プライバシーポリシーをご確認ください。');
        $('#case1-contract').prop('checked', false);
      }
    });

    var case2_1_use_flag = 0,
      case2_1_privacy_flag = 0;

    $('.case2-1-use').click(function () {
      case2_1_use_flag = 1;
    });

    $('.case2-1-privacy').click(function () {
      case2_1_privacy_flag = 1;
    });

    $('#case2-1-contract').click(function () {
      //console.log('case2_1_use_flag:' + case2_1_use_flag);
      //console.log('case2_1_privacy_flag:' + case2_1_privacy_flag);
      if (case2_1_use_flag == 0 && case2_1_privacy_flag == 0) {
        alert('利用規約とプライバシーポリシーをご確認ください。');
        $('#case2-1-contract').prop('checked', false);
      } else if (case2_1_use_flag == 0 && case2_1_privacy_flag == 1) {
        alert('利用規約をご確認ください。');
        $('#case2-1-contract').prop('checked', false);
      } else if (case2_1_use_flag == 1 && case2_1_privacy_flag == 0) {
        alert('プライバシーポリシーをご確認ください。');
        $('#case2-1-contract').prop('checked', false);
      }
    });

    var case3_use_flag = 0,
      case3_privacy_flag = 0;

    $('.case3-use').click(function () {
      case3_use_flag = 1;
    });

    $('.case3-privacy').click(function () {
      case3_privacy_flag = 1;
    });

    $('#case3-contract').click(function () {
      //console.log('case3_use_flag:' + case3_use_flag);
      //console.log('case3_privacy_flag:' + case3_privacy_flag);
      if (case3_use_flag == 0 && case3_privacy_flag == 0) {
        alert('利用規約とプライバシーポリシーをご確認ください。');
        $('#case3-contract').prop('checked', false);
      } else if (case3_use_flag == 0 && case3_privacy_flag == 1) {
        alert('利用規約をご確認ください。');
        $('#case3-contract').prop('checked', false);
      } else if (case3_use_flag == 1 && case3_privacy_flag == 0) {
        alert('プライバシーポリシーをご確認ください。');
        $('#case3-contract').prop('checked', false);
      }
    });

    $('.__row-custom3 td input[type=radio], .__row-custom3 td input[type=checkbox]').change(function () {
      var case1Contract = $('#case1-contract:checked').val(),
        case1CheckEC = $('#case1-checkEC:checked').val(),
        case2Contract = $('#case2-1-contract:checked').val(),
        case3Contract = $('#case3-contract:checked').val();


      //console.log('case1Contract:' + case1Contract);
      //console.log('case2Contract:' + case2Contract);
      //console.log('case3Contract:' + case3Contract);

      if ((case1_use_flag == 1 && case1_privacy_flag == 1 && case1Contract == 1 && case1CheckEC == 1) || (case2_1_use_flag == 1 && case2_1_privacy_flag == 1 && case2Contract == 1) || (case3_use_flag == 1 && case3_privacy_flag == 1 && case3Contract == 1)) {
        $('.c-button-submit').css('display', 'inline-block');
      } else {
        $('.c-button-submit').css('display', 'none');
      }

      case1Contract = 0;
      case2Contract = 0;
      case3Contract = 0;

    });

    var submit_text = $('.c-button-submit').text();
    //console.log(submit_text);

    if (submit_text == '登録') {
      $('.c-button-submit').css('display', 'inline-block');
    }
  }

  var product_array_japan = ['WLK-4540WH', 'WLK-4515WH', 'WLK-1570WH', 'WLK-3040WH', 'WLK-2540WH', 'CRS-9040PK', 'CRS-9040PP', 'CRS-9040BK', 'CRS-90403DPK', 'CRS-90403DPP', 'CRS-90403DBK', 'SEP-7512DESKANA', 'SEP-7512DESKADK', 'SEP-7512DESKAIV', 'SEP-7512DESKFNA', 'SEP-7512DESKFDK', 'SEP-7512DESKFIV', 'CMO-3035JNA', 'CMO-3035JDK', 'CMO-3035JWH', 'CMO-6035JNA', 'CMO-6035JDK', 'CMO-6035JWH', 'PCL-90503DRE', 'PCL-90503DGR', 'VNT-4585D', 'VNT-7085D', 'VNT-7060H', 'VNT-1260D', 'VNT-9060D', 'VNT-9060G', 'VNT-3535M', 'POR-1830DNA', 'POR-1830DDK', 'POR-1830DWH', 'POR-1860DNA', 'POR-1860DDK', 'POR-1860DWH', 'POR-1860DHNA', 'POR-1860DHDK', 'POR-1860DHWH', 'POR-1860DESKNA', 'POR-1860DESKDK', 'POR-1860DESKWH', 'POR-1860SLNA', 'POR-1860SLDK', 'POR-1860SLWH', 'POR-1812TVNA', 'POR-1812TVDK', 'POR-1812TVWH', 'POR-5530DUNA', 'POR-5530DUDK', 'POR-5530DUWH', 'POR-5560DUNA', 'POR-5560DUDK', 'POR-5560DUWH', 'POR-5512DUNA', 'POR-5512DUDK', 'POR-5512DUWH', 'PRE-9560CDNA', 'PRE-9560CDDK', 'PRE-9560CDWH', 'PRE-9590CDNA', 'PRE-9590CDDK', 'PRE-9590CDWH', 'PRE-1860DNA', 'PRE-1860DDK', 'PRE-1860DWH', 'PRE-1860CDNA', 'PRE-1860CDDK', 'PRE-1860CDWH', 'POC-2080ATWH', 'POC-2080WPWH', 'POC-2080TPWH', 'POC-2060ATWH', 'POC-2060WPWH', 'POC-2060TPWH', 'LAD-1545NA', 'LAD-1570NA', 'LAD-2045DRNA', 'LAD-3535NA', 'LAD-4040NA', 'LAD-6020NA', 'LAD-6020MNA', 'LVA-2412TVNA', 'LVA-2412TVDK', 'LVA-2412TVWH', 'LVA-2440DNA', 'LVA-2440DDK', 'LVA-2440DWH', 'LVA-2480DNA', 'LVA-2480DDK', 'LVA-2480DWH', 'WNR-90403DWH', 'WNR-90403DDK', 'OF2-D075KEYNA', 'OF2-D075KEYWH', 'OF2-D110KEYNA', 'OF2-D110KEYWH', 'OF2-D180KEYNA', 'OF2-D180KEYWH', 'WZM-1312LNA', 'WZM-1312LBK', 'WZM-1385SDLWH', 'WZM-1385SDLDK', 'CNT-7550HNA', 'CNT-7550HDK', 'CNT-7575DHNA', 'CNT-7575DHDK', 'CNT-8040HNA', 'CNT-8040HDK', 'LZM-2025BOXDK'];

  var product_array_fuquick = ['SEP-6040WNA', 'SEP-6040WDK', 'SEP-6040WIV', 'SEP-7040HNA', 'SEP-7040HDK', 'SEP-7040HIV', 'CEC-1255SL', 'CEC-1830DGH', 'CEC-1830WGH', 'CEC-1840DGH', 'CEC-1840WGH', 'CEC-1855DGHA', 'CEC-1855DGHF', 'CEC-8511CW', 'CEC-8575CW', 'CEC-8575SL', 'CEC-9065SL', 'CSC-9028HNA', 'CSC-9028HDK', 'CSC-9028HWH', 'CSC-9044HNA', 'CSC-9044HDK', 'CSC-9044HWH', 'CSC-9060HNA', 'CSC-9060HDK', 'CSC-9060HWH', 'CSC-9075HNA', 'CSC-9075HDK', 'CSC-9075HWH', 'CSC-9090HNA', 'CSC-9090HDK', 'CSC-9090HWH', 'CSC-1128HNA', 'CSC-1128HDK', 'CSC-1128HWH', 'CSC-1144HNA', 'CSC-1144HDK', 'CSC-1144HWH', 'CSC-1160HNA', 'CSC-1160HDK', 'CSC-1160HWH', 'CSC-1175HNA', 'CSC-1175HDK', 'CSC-1175HWH', 'CSC-1190HNA', 'CSC-1190HDK', 'CSC-1190HWH', 'CSC-1328HNA', 'CSC-1328HDK', 'CSC-1328HWH', 'CSC-1344HNA', 'CSC-1344HDK', 'CSC-1344HWH', 'CSC-1360HNA', 'CSC-1360HDK', 'CSC-1360HWH', 'CSC-1375HNA', 'CSC-1375HDK', 'CSC-1375HWH', 'CSC-1390HNA', 'CSC-1390HDK', 'CSC-1390HWH', 'CEN-1855DGH', 'NEO-8555H', 'BLS-8055H', 'FRS-7070H', 'FRS-9055H', 'HKO-4080H', 'HKO-5055H', 'HKO-7575GH', 'HNB-1855DGH', 'LAK-7555H', 'LAK-9565HNA', 'LAK-9565WNA', 'LAK-6575H', 'LAK-9075H', 'LVA-2412TVNA', 'LVA-2412TVDK', 'LVA-2412TVWH', 'WGR-4090DH', 'WGR-8555H', 'WGR-7090DH'];

  var product_array_tanaquick = ['CRS-9040PK', 'CRS-9040PP', 'CRS-9040BK', 'CRS-90403DPK', 'CRS-90403DPP', 'CRS-90403DBK', 'PCL-90503DRE', 'PCL-90503DGR', 'VNT-4585D', 'VNT-7085D', 'VNT-7060H', 'VNT-1260D', 'VNT-9060D', 'VNT-9060G', 'WNR-90403DWH', 'WNR-90403DDK'];

  var product_array_quickrail = ['VNT-3535M', 'LAD-1545NA', 'LAD-1570NA', 'LAD-2045DRNA', 'LAD-3535NA', 'LAD-4040NA', 'LAD-6020NA', 'LAD-6020MNA'];

  var pageName = location.pathname;
  if (pageName == '/list.php') {

    var arg = new Object;
    url = location.search.substring(1).split('&');

    for (i = 0; url[i]; i++) {
      var k = url[i].split('=');
      arg[k[0]] = k[1];
    }

    if (url[0] != '') {
      var params_text = arg.keyword.replace('+', " ");
      $('#header-search input[name="keyword"]').val(decodeURI(params_text));
    }



    $('.__list--block .__product .__item').each(function () {
      var product_name = $(this).find('h2.__title').text();

      //console.log(product_name);
      var product_id = product_name.split('[');
      for (var i = 1; i < product_id.length; i++) {
        var product_id_space = (product_id[i].split(']')[0]);
      }
      //console.log(product_name);
      product_id = product_id_space.replace(/\s+/g, "");


      if ($.inArray(product_id, product_array_quickrail) >= 0) {
        $('<span class="labelType01 tooltip labelColor05" title="水平器が無くても簡単にまっすぐ取り付けができます。壁の穴も画鋲程度の小さな穴です。">クイックレール</span>').insertAfter($(this).find('.__photo '));
      }

      if ($.inArray(product_id, product_array_tanaquick) >= 0) {
        $('<span class="labelType01 tooltip labelColor04" title="付属の工具だけで簡単に組み立てできます！ドライバーやハンマーは不要です。">タナクイック</span>').insertAfter($(this).find('.__photo '));
      }

      if (($.inArray(product_id, product_array_fuquick) >= 0) || (~product_id.indexOf('CSC-EM'))) {
        $('<span class="labelType01 tooltip labelColor03" title="手で押し込むだけで引出が簡単に組み立てできます！ドライバーやハンマーは不要です。">フクイック</span>').insertAfter($(this).find('.__photo '));
      }

      if (($.inArray(product_id, product_array_japan) >= 0) || (~product_id.indexOf('-EM'))) {
        $('<span class="labelType01 tooltip labelColor01">日本製</span>').insertAfter($(this).find('.__photo '));
      }
    })
  } else if (pageName == '/product.php') {
    var product_name = $('.__information .__title').text();
    //console.log(product_name);
    var product_id = product_name.split('[');
    for (var i = 1; i < product_id.length; i++) {
      var product_id_space = (product_id[i].split(']')[0]);
    }
    product_id = product_id_space.replace(/\s+/g, "");
    //console.log(product_id);

    var wappen_html = "";
    if (($.inArray(product_id, product_array_japan) >= 0) || (~product_id.indexOf('-EM'))) {
      wappen_html = wappen_html + '<span class="labelType01 tooltip labelColor01">日本製</span>';
    }

    if (($.inArray(product_id, product_array_fuquick) >= 0) || (~product_id.indexOf('CSC-EM'))) {
      wappen_html = wappen_html + '<span class="labelType01 tooltip labelColor03" title="手で押し込むだけで引出が簡単に組み立てできます！ドライバーやハンマーは不要です。">フクイック</span>';
    }

    if ($.inArray(product_id, product_array_tanaquick) >= 0) {
      wappen_html = wappen_html + '<span class="labelType01 tooltip labelColor04" title="付属の工具だけで簡単に組み立てできます！ドライバーやハンマーは不要です。">タナクイック</span>';
    }

    if ($.inArray(product_id, product_array_quickrail) >= 0) {
      wappen_html = wappen_html + '<span class="labelType01 tooltip labelColor05" title="水平器が無くても簡単にまっすぐ取り付けができます。壁の穴も画鋲程度の小さな穴です。">クイックレール</span>';
    }

    if (wappen_html != "") {
      wappen_html = '<div class="__wappen_box">' + wappen_html + '</div>';
      $(wappen_html).insertBefore('.__secondary .__title')
    }

    var bookmark_html = $('.__bookmark').prop('outerHTML');
    $('.__bookmark').remove();
    bookmark_html = '<section class="__information bookmark_button"><div class="__secondary"><div class="__control">' + bookmark_html + '</div></div></section>	';
    $('.__add-cart').before(bookmark_html);
  }


  //show-panelボタンをクリックしたらLightBoxを表示する
  $("a#show-panel").click(function () {
    event.preventDefault();
    $("#BlackWindow, #lightbox-panel").fadeIn(300); /*表示速度は数値を調整*/
  });
  //CloseボタンをクリックしたらLightBoxを閉じる
  $("a#close-panel").click(function () {
    event.preventDefault();
    $("#BlackWindow, #lightbox-panel").fadeOut(300); /*フォードアウトの速度は数値を調整*/
  });
  //背景の黒地をクリックしたらLightBoxを閉じる
  $("#BlackWindow").click(function () {
    event.preventDefault();
    $("#BlackWindow, #lightbox-panel").fadeOut(300); /*フォードアウトの速度は数値を調整*/
  });

  $(".downloads-list-box-inner a").click(function () {
    //var fileName = $(this).attr("href");
    //console.log(fileName);
    //_gaq.push(["_trackPageview", fileName]);
    //ga('send', 'event', 'Shiryo-Downloads', '/product/top.html');"
  });

  $('.faqChengeTab li').click(function () {
    var index = $('.faqChengeTab li').index(this);
    $('.faqChengeTab li').removeClass('active');
    $(this).addClass('active');
    $('.questionType > div').removeClass('show').eq(index).addClass('show');

  });

  $('.faq-item .question').click(function () {
    $(this).next('.answer').slideToggle();
  });


});


$(window).on('load resize', function () {
	/*
	var windowSize = $(window).width();
	if ($('.p-product-set .assembly-service').length){
		if (windowSize >= 641){
			var productSetTableWidth = $('.p-product-set').width();
			$(".assembly-service").each(function () {
				$(this).css('width', productSetTableWidth +'px');
			});
		} else {
			$(".assembly-service").each(function () {
				$(this).css('width', 'auto');
			});
		}	
	} 
	*/

  if ($('#slide-menu-button').length) {
    var $win = $(window),
      $header = $('#header-container'),
      $menu_button = $('#slide-menu-button'),
      $search = $('#header-search'),
      header_Height = $header.outerHeight(),
      header_Pos = $header.offset().top,
      menu_button_Height = $menu_button.outerHeight(),
      menu_button_Pos = $menu_button.offset().top,
      search_Height = $search.outerHeight(),
      search_header_Pos = $search.offset().top,
      fixedClass = 'is-fixed';

    $win.on('load scroll resize', function () {

      var win_w = $(window).width(),
        value = $(this).scrollTop();

      if (win_w >= 1157) {

        if (value > header_Pos) {
          $header.addClass(fixedClass);
        } else {
          $header.removeClass(fixedClass);
        }
      }

      if (value > menu_button_Pos) {
        $menu_button.addClass(fixedClass);
      } else {
        $menu_button.removeClass(fixedClass);
      }

      if (value > search_header_Pos) {
        $search.addClass(fixedClass);
      } else {
        $search.removeClass(fixedClass);
      }


    });

  }

});

function orderSelectSizeExtraction() {
  var arg = new Object,
    url = location.search.substring(1).split('&');
  //console.log(url);

  for (i = 0; url[i]; i++) {
    var k = url[i].split('=');
    arg[k[0]] = k[1];
  }

  if (arg.w != undefined && arg.c != undefined) {
    var abc = arg.w + 'cm',
      colorPram = arg.c;


    switch (colorPram) {
      case 'KW':
        def = 'KW ブラックウォールナット';
        break;
      case 'DK':
        def = 'DK ダークオーク';
        break;
      case 'BW':
        def = 'BW ブラウンウォールナット';
        break;
      case 'BO':
        def = 'BO ブラウンオーク';
        break;
      case 'NT':
        def = 'NT ナチュラルチーク';
        break;
      case 'NC':
        def = 'NC ナチュラルオーク３';
        break;
      case 'NA':
        def = 'NA ナチュラルオーク１';
        break;
      case 'NB':
        def = 'NB ナチュラルビーチ';
        break;
      case 'WH':
        def = 'WH ホワイトオーク';
        break;
      case 'WT':
        def = 'WT ホワイト単色';
        break;
    }

    //console.log('abc:' + abc);
    //console.log('def:' + def);
    $("#item1").val(abc);
    $("#item2").val(def);

    var re = new RegExp(abc),
      re2 = new RegExp(def);

    $(".p-product-set tbody tr").each(function () {
      var txt = $(this).find("td:eq(0)").html();
      if (txt.match(re) != null) {
        if (txt.match(re2) != null) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else {
        if (txt.indexOf('サービス') != -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }
    });
  }

  product_tagsLink();

  function product_tagsLink() {
    var array = $('.body-product-detail .__secondary #product-tags').text().split(',');
    $('.body-product-detail .__secondary #product-tags').html('<h4>タグ一覧</h4>');
    $('.body-product-detail .__secondary #product-tags').insertAfter('.body-product-detail .__secondary .__spec');
    $.each(array, function (i, value) {
      $('.body-product-detail .__secondary #product-tags').append('<a href="/list.php?keyword=' + value + '">' + value + '</a>');
    });
  }
};

$(document).ready(function () {
  $('.tooltip').tooltipster();
  orderSelectSizeExtraction();
  if($('.body-product-detail').length) {
    tnl_em_readyMadeCheck();
   }
});

$(window).load(function () {
  var h = $(window).height();
  $('#slide_box_menu-inner').css("height", h);

  var dh = $(document).height();
  $('#slide-menu-blocker').css("height", dh);
  $('#BlackWindow').css("height", dh);
});

$(window).resize(function () {
  var h = $(window).height();
  $('#slide_box_menu-inner').css("height", h);

  var dh = $(document).height();
  $('#slide-menu-blocker').css("height", dh);
  $('#BlackWindow').css("height", dh);
});

function tnl_em_readyMadeCheck() {
  var size_array = ['31','44','59','87','117'];
  var color_array = ['DK','NA','WH'];
  var type1_array = ['M'];
  var type2_array = ['F2'];
  var type3_array = ['TNL-EMT'];
	$('.p-product-set table tr.__item').each(function(){
		var size = $(this).find('.__custom--1 dd').text().replace(/[^0-9]/g, '');
		var color = $(this).find('.__custom--3 dd').text().replace(/[^A-Z]/g, '');
    var type1 = $(this).find('.__no dd').text().slice(-3,-2);
    var type2 = $(this).find('.__no dd').text().slice(-2);
    var type3 = $(this).find('.__no dd').text().slice(0,7);

    //console.log('type1:'+type1);
    //console.log('type2:'+type2);
    //console.log('type3:'+type3);

    var flag1 = $.inArray(size,size_array);
    var flag2 = $.inArray(color,color_array);
    var flag3 = $.inArray(type1,type1_array);
    var flag4 = $.inArray(type2,type2_array);
    var flag5 = $.inArray(type3,type3_array);
    if(flag5 >= 0) {
      if(flag1 >= 0 && flag2 >= 0 && flag3 >= 0 && flag4 >= 0) {
        //console.log(size);
        //console.log(color);
        $(this).find('.__order').html('<div class="__notice"><p class="order_notice">このサイズとカラーは既製品になります。<br>既製品をご注文ください。</p></div>');
        //$(this).find('.__order').html('<div class="__notice"><p class="order_notice">このサイズとカラーは既製品になります。<br><a href="https://shirai-businessonline.com/list.php?keyword=TNL-T' + size + '+' + color + '">こちら</a>からご注文ください。</p></div>');
      }
    }
	});
}