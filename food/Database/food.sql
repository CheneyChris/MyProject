/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : food

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-08-13 20:34:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pre_admin
-- ----------------------------
DROP TABLE IF EXISTS `pre_admin`;
CREATE TABLE `pre_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(45) DEFAULT NULL,
  `admin_pwd` varchar(32) DEFAULT NULL,
  `admin_time` int(11) DEFAULT NULL,
  `admin_img` varchar(255) DEFAULT NULL,
  `admin_action` text COMMENT '管理员权限',
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of pre_admin
-- ----------------------------
INSERT INTO `pre_admin` VALUES ('1', 'admin', '63a9f0ea7bb98050796b649e85481845', null, null, null);

-- ----------------------------
-- Table structure for pre_admin_action
-- ----------------------------
DROP TABLE IF EXISTS `pre_admin_action`;
CREATE TABLE `pre_admin_action` (
  `action_id` int(11) NOT NULL AUTO_INCREMENT,
  `action_name_zh` varchar(100) DEFAULT NULL COMMENT '中文名称',
  `action_name_en` varchar(100) DEFAULT NULL COMMENT '英文名称',
  `parent_id` int(11) DEFAULT '0' COMMENT '父ID',
  PRIMARY KEY (`action_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员权限表';

-- ----------------------------
-- Records of pre_admin_action
-- ----------------------------

-- ----------------------------
-- Table structure for pre_article
-- ----------------------------
DROP TABLE IF EXISTS `pre_article`;
CREATE TABLE `pre_article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `art_title` varchar(255) DEFAULT NULL,
  `art_time` int(11) DEFAULT NULL,
  `art_content` text,
  `art_img` varchar(255) DEFAULT NULL,
  `art_info_content` text,
  `art_author` varchar(45) DEFAULT NULL,
  `artcate_id` int(11) NOT NULL COMMENT '文章分类的外键',
  PRIMARY KEY (`art_id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ----------------------------
-- Records of pre_article
-- ----------------------------
INSERT INTO `pre_article` VALUES ('4', '公司简介', '123123', '<p>贵族食代牛排是昔日的台湾首富、台湾知名企业贵族食代集团董事长王永庆先生招待贵宾的知名私房料理。严选一头牛的第六至第八对肋骨这六块牛排。是以“一头牛仅供6客”的贵族食代牛排为招牌菜的中高价位直营连锁西餐厅，独具中国口味，全熟牛排，鲜嫩多汁，适合中国人口味，以菜色精致、好吃、服务好、风格高雅、管理专业着称。</p>\n            <p>何谓经典，可能就是在品鉴无数美食后，其绝妙的滋味仍旧不能被替代。再次品味时，仍能激起内心的波澜与感动。如此经典，我们将为您重新诠释。全新的摆盘，搭配特制爽口的配菜，全熟风味，您不可辜负的舌尖美味。</p>\n            <p>2003年登陆大陆，截至目前，贵族食代牛排在上海、北京、深圳、广州、南京、武汉、成都、重庆等地已经有40余家直营店，成为高端连锁牛排的领导品牌。</p>', 'uploads/pic1.png', null, '123123', '2');
INSERT INTO `pre_article` VALUES ('5', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('6', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('7', '西餐代表 牛排的种类和吃法西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('8', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('9', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('10', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('11', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('12', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('13', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('14', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');
INSERT INTO `pre_article` VALUES ('15', '西餐代表 牛排的种类和吃法', '123123', '提到牛排，脑子里就会想到焦棕褐色、表面扶着香甜的肉汁，切开后的粉红肉质，入口之后留下的满口肉香。吃牛排其实是非常讲究的，精致的牛肉配上美味的香料，加以烹调，是款待尊贵客人的最佳美食。', 'uploads/news-pic1.jpg', '<p class=\"news-conitem\">牛排的分类知多少？</p>\r\n	<p class=\"news-conitem\">西冷牛排（SIRLOIN）：也叫沙朗牛排，是指肉质鲜嫩又带油花嫩筋的牛肉，基本上取自于牛背脊一带最柔嫩的牛肉，具体位置不同，风味也各有千秋。比较正宗的沙朗取自后腰脊肉，但特殊的品种例如纽约客，则是取自于类似菲力的前腰脊肉。沙朗牛排肉质鲜嫩且香甜多汁，富有口感，受入门级牛排行家所偏好。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">菲力牛排（FILLET）：也称嫩牛柳，牛里脊（TENDERLOIN)，取自于牛的里肌肉（即腰内肉），运动量少，且肉质最嫩精瘦，油脂少，因每头牛就一小条而显得「物稀为贵」。口感好但没有嚼头，并且烹煮过头就显得老涩，因此多推荐给牙口不好，消化较弱的老人家或小朋友食用。</p>\r\n	<p class=\"news-conitem\">推荐火候：三至七分熟。</p>\r\n	<p class=\"news-conitem\">丁骨牛排(T BONE)：是牛背上的脊骨肉，大块肉排中间夹着 T 字形的大骨,一边是菲力,一边是纽约客,肉质一细嫩一粗犷,或油腴或爽俐,点一客统统吃得到。</p>\r\n	<p class=\"news-conitem\">推荐火候：五至八分熟 。</p>\r\n	<p class=\"news-conitem\">肋眼牛排(RIB EYE) ：取自于牛肋脊部位，即牛骨边上的肉。肋眼牛排或许比不上腰脊肉那样嫩，但骨边肉向来好吃，油油嫩嫩的肉丝中夹着Q而有劲的油筋，比沙朗耐嚼，比菲力够味，而且油花十分丰郁，是受年轻男食客喜欢。</p>\r\n	<p class=\"news-conitem\">推荐火候：四至六分熟。</p>\r\n	<p class=\"news-conitem\">牛小排：牛小排取自于牛的胸腔左右两侧，含肋骨部分。牛小排带骨带筋肉质肥腴鲜美，多汁且耐嚼，有大理石纹，特别是采用牛的第六、七根肋骨的，嫩而不涩，肉量丰郁的全熟肉质，即使是怕生的食客也可怡然享用，更创造出牛小排的另类魅力。</p>\r\n	<p class=\"news-conitem\">推荐火候：全熟。</p>\r\n	<p class=\"news-conitem\">除了上述的品种，餐桌上常见的还有像牛肩胛部位的板腱肉、上肩胛肋眼心、牛肚部位的腹胁肉、上后腿肉等，这些部位虽然肉质纤维较粗，无法媲美以上品种。</p>\r\n	<p class=\"news-conitem\">牛排你要几成熟？</p>\r\n	<p class=\"news-conitem\">三分熟牛排，不是血淋淋的，看得到的只有一样漂亮的焦棕褐色，表面浮渗着香甜的肉汁。下刀切开后，看到的是火腿肠般的暗红色，品尝起来，入口只需轻轻嚼动便温润即化，留下满口的鲜甜馀香，这样，才是“三分熟”！</p>\r\n	<p class=\"news-conitem\">一分熟牛排（rare）：牛排内部为血红色且内部各处保持一定温度（高于very rare steak）。</p>\r\n	<p class=\"news-conitem\">三分熟牛排（medium rare）：内部为桃红且带有相当热度。</p>\r\n	<p class=\"news-conitem\">五分熟牛排（medium）：牛排内部为粉红且夹杂着浅灰和综褐色，整个牛排都很烫。</p>\r\n	<p class=\"news-conitem\">七分熟牛排（medium well）：牛排内部主要为浅灰综褐色，夹杂着粉红色。</p>\r\n	<p class=\"news-conitem\">全熟牛排（well done）：牛排内部为褐色。</p>', '123123', '3');

-- ----------------------------
-- Table structure for pre_article_cate
-- ----------------------------
DROP TABLE IF EXISTS `pre_article_cate`;
CREATE TABLE `pre_article_cate` (
  `artcate_id` int(11) NOT NULL AUTO_INCREMENT,
  `artcate_name` varchar(150) DEFAULT NULL COMMENT '文章分类',
  PRIMARY KEY (`artcate_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ----------------------------
-- Records of pre_article_cate
-- ----------------------------
INSERT INTO `pre_article_cate` VALUES ('1', '广告图分类');
INSERT INTO `pre_article_cate` VALUES ('2', '公司简介');
INSERT INTO `pre_article_cate` VALUES ('3', '新闻资讯分类');
INSERT INTO `pre_article_cate` VALUES ('7', '5请问如右图');

-- ----------------------------
-- Table structure for pre_catefood
-- ----------------------------
DROP TABLE IF EXISTS `pre_catefood`;
CREATE TABLE `pre_catefood` (
  `fcate_id` int(11) NOT NULL AUTO_INCREMENT,
  `fcate_name` varchar(45) DEFAULT NULL,
  `fcate_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`fcate_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='食品分类\n';

-- ----------------------------
-- Records of pre_catefood
-- ----------------------------
INSERT INTO `pre_catefood` VALUES ('1', '经典牛排', '1530365533');
INSERT INTO `pre_catefood` VALUES ('2', '意面/烩饭', '1530365533');
INSERT INTO `pre_catefood` VALUES ('3', '风味披萨', '1530365533');
INSERT INTO `pre_catefood` VALUES ('4', '甜品小食', '1530365533');
INSERT INTO `pre_catefood` VALUES ('5', '酒水饮料', '1530365533');
INSERT INTO `pre_catefood` VALUES ('6', '其他', '1530365533');

-- ----------------------------
-- Table structure for pre_company
-- ----------------------------
DROP TABLE IF EXISTS `pre_company`;
CREATE TABLE `pre_company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `company_phone` varchar(45) DEFAULT NULL COMMENT '电话号码',
  `company_address` varchar(255) DEFAULT NULL COMMENT '地址',
  `company_fax` varchar(150) DEFAULT NULL COMMENT '传真',
  `company_region` varchar(100) DEFAULT NULL COMMENT '邮编',
  `company_img` varchar(255) DEFAULT NULL,
  `company_time` int(11) DEFAULT NULL,
  `company_email_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='公司表-关于我们';

-- ----------------------------
-- Records of pre_company
-- ----------------------------
INSERT INTO `pre_company` VALUES ('1', '总公司', '电话：0512-8081 5888', '地址：江苏省苏州市人民路3188号万达广场5幢迪欧大厦', '传真：0512-8081 5566', '', 'uploads/about-pic1.jpg', '1234254365', '邮编：215031');
INSERT INTO `pre_company` VALUES ('2', '总公司', '电话：0512-8081 5888', '地址：江苏省苏州市人民路3188号万达广场5幢迪欧大厦', '传真：0512-8081 5566', null, 'uploads/about-pic1.jpg', '1234254365', '邮编：215031');
INSERT INTO `pre_company` VALUES ('3', '总公司', '电话：0512-8081 5888', '地址：江苏省苏州市人民路3188号万达广场5幢迪欧大厦', '传真：0512-8081 5566', null, 'uploads/about-pic1.jpg', '1234254365', '邮编：215031');
INSERT INTO `pre_company` VALUES ('4', '总公司', '电话：0512-8081 5888', '地址：江苏省苏州市人民路3188号万达广场5幢迪欧大厦', '传真：0512-8081 5566', null, 'uploads/about-pic1.jpg', '1234254365', '邮编：215031');
INSERT INTO `pre_company` VALUES ('5', '总公司', '电话：0512-8081 5888', '地址：江苏省苏州市人民路3188号万达广场5幢迪欧大厦', '传真：0512-8081 5566', null, 'uploads/about-pic1.jpg', '1234254365', '邮编：215031');
INSERT INTO `pre_company` VALUES ('6', '总公司123213', '电话：0512-8081 5888', '', '传真：0512-8081 5566', null, 'uploads/about-pic1.jpg', '2147483647', '邮编：215031');

-- ----------------------------
-- Table structure for pre_config
-- ----------------------------
DROP TABLE IF EXISTS `pre_config`;
CREATE TABLE `pre_config` (
  `conf_id` int(11) NOT NULL AUTO_INCREMENT,
  `conf_name` varchar(255) DEFAULT NULL COMMENT '网站名称',
  `conf_content` text COMMENT '网站描述内容',
  `conf_img` varchar(255) DEFAULT NULL COMMENT '图片',
  `conf_copyright` varchar(255) DEFAULT NULL COMMENT '版权',
  `conf_email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `conf_phone` varchar(100) DEFAULT NULL COMMENT '电话号码',
  PRIMARY KEY (`conf_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of pre_config
-- ----------------------------
INSERT INTO `pre_config` VALUES ('1', 'best website', 'ICP备案号：京ICP备16047255号-3本站信息由会员自主添加，如信息涉及隐私等，网站不承担任何责任！', 'uploads/201808132032223217.jpg', 'CopyRight©2003-2015 www.91cy.cn All rigt rederved	版权所有：贵族食代牛排有限公司 来源:', 'xxxx@gmaill.com', '110-120-119');

-- ----------------------------
-- Table structure for pre_food
-- ----------------------------
DROP TABLE IF EXISTS `pre_food`;
CREATE TABLE `pre_food` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_name` varchar(45) DEFAULT NULL,
  `food_price` varchar(45) DEFAULT NULL,
  `food_img` varchar(255) DEFAULT NULL,
  `food_time` int(11) DEFAULT NULL,
  `food_content` text,
  `fcate_id` int(11) NOT NULL,
  PRIMARY KEY (`food_id`,`fcate_id`),
  KEY `fk_pre_food_pre_catefood1_idx` (`fcate_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='食品表';

-- ----------------------------
-- Records of pre_food
-- ----------------------------
INSERT INTO `pre_food` VALUES ('1', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>', '1');
INSERT INTO `pre_food` VALUES ('2', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('3', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('4', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '2');
INSERT INTO `pre_food` VALUES ('5', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '2');
INSERT INTO `pre_food` VALUES ('6', '测试数据', '999', 'uploads/food-png5.png', '0', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('7', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '2');
INSERT INTO `pre_food` VALUES ('8', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('9', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('10', '213', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('11', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '3');
INSERT INTO `pre_food` VALUES ('12', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '3');
INSERT INTO `pre_food` VALUES ('13', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '3');
INSERT INTO `pre_food` VALUES ('14', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '3');
INSERT INTO `pre_food` VALUES ('15', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '3');
INSERT INTO `pre_food` VALUES ('16', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('17', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('18', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('19', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('20', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('21', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('22', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '4');
INSERT INTO `pre_food` VALUES ('23', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('24', '茶漱海鲜汤', '999', 'uploads/food-png5.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('25', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('26', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('27', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', ' <p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '5');
INSERT INTO `pre_food` VALUES ('28', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '5');
INSERT INTO `pre_food` VALUES ('29', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '5');
INSERT INTO `pre_food` VALUES ('30', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '5');
INSERT INTO `pre_food` VALUES ('31', '茶漱海鲜汤', '999', 'uploads/food-png1.png', '123123123', '<p>菲力牛排，就是用一定厚度的牛里脊肉做出的牛排。菲力指的是牛里脊肉（beef tenderloin）。在澳洲，这块肉被称为“眼菲力”，在法国和英国被称为filet和fillet，中文音译菲力。</p>\r\n				<p>很多人认为牛排最早是西方人的美食，在欧洲中世纪的时候就开始出现了，牛排只有贵族才可以吃到的美食，而猪肉和羊肉只有平常百姓才可以吃到的，牛肉是贵族的象征，想要吃到牛排除非得到国王的赏识或者立下过过劳的战士才有机会吃到的。</p>\r\n				<p>尊贵的牛肉被他们搭配上了当时也是享有尊贵身份的胡椒及香辛料一起烹调，并在特殊场合中供应，以彰显主人的尊贵身份。到了18世纪，英国已经成了著名的牛肉食用大国。</p>\r', '1');
INSERT INTO `pre_food` VALUES ('44', '（手动滑稽）', '99', 'uploads/201808132031231103.jpg', '0', '滑稽树上滑稽果，滑稽树下你和我', '6');

-- ----------------------------
-- Table structure for pre_link
-- ----------------------------
DROP TABLE IF EXISTS `pre_link`;
CREATE TABLE `pre_link` (
  `link_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '友情链接id',
  `link_name` varchar(200) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `link_img` varchar(255) DEFAULT NULL,
  `link_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`link_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='友情链接表\n';

-- ----------------------------
-- Records of pre_link
-- ----------------------------
INSERT INTO `pre_link` VALUES ('2', '', 'baidu.com', 'uploads/link1.png', '1');
INSERT INTO `pre_link` VALUES ('3', '', 'baidu.com', 'uploads/link1.png', '1');
INSERT INTO `pre_link` VALUES ('4', '', 'baidu.com', 'uploads/link1.png', '1');
INSERT INTO `pre_link` VALUES ('5', '', 'baidu.com', 'uploads/link1.png', '1');
INSERT INTO `pre_link` VALUES ('6', '\r\n', 'baidu.com', 'uploads/link1.png', '1');

-- ----------------------------
-- Table structure for pre_region
-- ----------------------------
DROP TABLE IF EXISTS `pre_region`;
CREATE TABLE `pre_region` (
  `region_id` int(11) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='地区表\n';

-- ----------------------------
-- Records of pre_region
-- ----------------------------
INSERT INTO `pre_region` VALUES ('1', '北京店');
INSERT INTO `pre_region` VALUES ('2', '上海店');
INSERT INTO `pre_region` VALUES ('3', '厦门店');
INSERT INTO `pre_region` VALUES ('4', '广州店');
INSERT INTO `pre_region` VALUES ('5', '深圳店');
INSERT INTO `pre_region` VALUES ('6', '其他');

-- ----------------------------
-- Table structure for pre_shop
-- ----------------------------
DROP TABLE IF EXISTS `pre_shop`;
CREATE TABLE `pre_shop` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(200) DEFAULT NULL COMMENT '商店名称',
  `shop_phone` varchar(45) DEFAULT NULL,
  `shop_address` varchar(150) DEFAULT NULL,
  `shop_fax` varchar(45) DEFAULT NULL COMMENT '传真',
  `shop_img` varchar(255) DEFAULT NULL,
  `shop_region` varchar(45) DEFAULT NULL COMMENT '地区名称\n',
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`shop_id`,`region_id`),
  KEY `fk_pre_shop_pre_region1_idx` (`region_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='商店';

-- ----------------------------
-- Records of pre_shop
-- ----------------------------
INSERT INTO `pre_shop` VALUES ('1', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/201806301832196050.jpg', '', '1');
INSERT INTO `pre_shop` VALUES ('2', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', '', '2');
INSERT INTO `pre_shop` VALUES ('3', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', '', '3');
INSERT INTO `pre_shop` VALUES ('4', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', '', '4');
INSERT INTO `pre_shop` VALUES ('5', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/201806301834225693.jpg', '', '1');
INSERT INTO `pre_shop` VALUES ('6', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', '', '6');
INSERT INTO `pre_shop` VALUES ('12', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '6');
INSERT INTO `pre_shop` VALUES ('11', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '5');
INSERT INTO `pre_shop` VALUES ('10', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '4');
INSERT INTO `pre_shop` VALUES ('9', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '3');
INSERT INTO `pre_shop` VALUES ('8', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '2');
INSERT INTO `pre_shop` VALUES ('7', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '1');
INSERT INTO `pre_shop` VALUES ('13', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '1');
INSERT INTO `pre_shop` VALUES ('14', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '2');
INSERT INTO `pre_shop` VALUES ('15', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '3');
INSERT INTO `pre_shop` VALUES ('16', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '4');
INSERT INTO `pre_shop` VALUES ('17', '北京朝阳区店', '15385234123', '北京市中关村....', '100000', 'uploads/shop-pic1.jpg', null, '5');
INSERT INTO `pre_shop` VALUES ('20', 'Chris_chen', 'Chris_chen', 'Chris_chen', 'Chris_chen', 'uploads/201806301827192255.jpg', null, '1');
