/*
Source Host           : localhost:3306
Source Database       : anekdot
Target Server Type    : MYSQL
File Encoding         : 65001
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `anekdot`
-- ----------------------------
DROP TABLE IF EXISTS `anekdot`;
CREATE TABLE `anekdot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  `caption` tinytext,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of anekdot
-- ----------------------------

-- ----------------------------
-- Table structure for `link`
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `anekdot` int(10) unsigned NOT NULL,
  `tag` int(10) unsigned NOT NULL,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  KEY `anekdot_link` (`anekdot`),
  KEY `tag_link` (`tag`),
  CONSTRAINT `anekdot_link` FOREIGN KEY (`anekdot`) REFERENCES `anekdot` (`id`),
  CONSTRAINT `tag_link` FOREIGN KEY (`tag`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of link
-- ----------------------------

-- ----------------------------
-- Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for `version`
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `anekdot` int(11) unsigned NOT NULL,
  `name` tinytext,
  `text` text NOT NULL,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  KEY `anekdot` (`anekdot`),
  CONSTRAINT `anekdot_version` FOREIGN KEY (`anekdot`) REFERENCES `anekdot` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of version
-- ----------------------------
