SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for anekdot
-- ----------------------------
DROP TABLE IF EXISTS `anekdot`;
CREATE TABLE `anekdot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  `title` tinytext,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for link
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
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `anekdot` int(11) unsigned NOT NULL,
  `title` tinytext,
  `text` text NOT NULL,
  `hide` bit(1) NOT NULL DEFAULT b'0',
  KEY `anekdot` (`anekdot`),
  CONSTRAINT `anekdot_version` FOREIGN KEY (`anekdot`) REFERENCES `anekdot` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS=1;
