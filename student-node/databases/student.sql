-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 �?07 �?30 �?09:28
-- 服务器版本: 5.5.53
-- PHP 版本: 5.6.27

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `student`
--
CREATE DATABASE `student` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `student`;

-- --------------------------------------------------------

--
-- 表的结构 `student_access`
--

CREATE TABLE IF NOT EXISTS `student_access` (
  `access_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `access_name` varchar(100) DEFAULT NULL COMMENT '''权限的页面名字''',
  `access_url` varchar(100) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `isnav` tinyint(1) NOT NULL,
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

--
-- 转存表中的数据 `student_access`
--

INSERT INTO `student_access` (`access_id`, `access_name`, `access_url`, `parent_id`, `isnav`, `is_show`) VALUES
(1, '班级管理', 'class', 0, 1, 1),
(2, '班级列表', 'class_list', 1, 1, 1),
(3, '班级添加', 'class_add', 1, 1, 1),
(4, '用户管理', 'user', 0, 1, 1),
(5, '用户列表', 'user_list', 4, 1, 1),
(6, '用户添加', 'user_add', 4, 1, 1),
(7, '作业管理', 'homework', 0, 1, 1),
(8, '作业列表', 'homework_list', 7, 1, 1),
(9, '作业添加', 'homework_add', 7, 1, 1),
(10, '公告管理', 'notice', 0, 1, 1),
(11, '公告列表', 'notice_list', 10, 1, 1),
(12, '公告添加', 'notice_add', 10, 1, 1),
(13, '反馈管理', 'feedback', 0, 1, 1),
(14, '反馈列表', 'feedback_list', 13, 1, 1),
(15, '反馈添加', 'feedback_add', 13, 1, 1),
(16, '聊天记录管理', 'chat', 0, 1, 0),
(17, '聊天记录列表', 'chat_list', 16, 1, 0),
(18, '钱包管理', 'money', 0, 1, 0),
(19, '钱包信息', 'money_edit', 18, 1, 0),
(20, '消费记录管理', 'expense', 0, 1, 1),
(21, '消费记录列表', 'expense_list', 20, 1, 1),
(22, '所报课程管理', 'stucurr', 0, 1, 0),
(23, '所报课程信息', 'stucurr_edit', 22, 1, 0),
(24, '订单管理', 'orderform', 0, 1, 1),
(25, '订单列表', 'orderform_list', 24, 1, 1),
(26, '课程管理', 'curriculum', 0, 1, 1),
(27, '课程列表', 'curriculum_list', 26, 1, 1),
(28, '课程添加', 'curriculum_add', 26, 1, 1),
(29, '账号管理', 'account', 0, 1, 0),
(30, '账号信息', 'account_list', 29, 1, 0),
(31, '账号添加', 'account_add', 29, 1, 0),
(32, '权限角色管理', 'role', 0, 1, 1),
(33, '角色列表', 'role_list', 32, 1, 1),
(34, '角色添加', 'role_add', 32, 1, 1),
(36, '班级编辑', 'class_edit', 1, 0, 1),
(37, '班级删除', 'class_delete', 1, 0, 1),
(38, '用户编辑', 'user_edit', 4, 0, 1),
(39, '用户删除', 'user_delete', 4, 0, 1),
(40, '作业编辑', 'homework_edit', 7, 0, 1),
(41, '作业删除', 'homework_delete', 7, 0, 1),
(42, '公告编辑', 'notice_edit', 10, 0, 1),
(43, '公告删除', 'notice_delete', 10, 0, 1),
(44, '反馈编辑', 'feedback_edit', 13, 0, 1),
(45, '反馈删除', 'feedback_delete', 13, 0, 1),
(46, '所报课程编辑', 'stucurr_edit', 22, 0, 0),
(47, '所报课程删除', 'stucurr_delete', 22, 0, 0),
(48, '订单编辑', 'orderform_edit', 24, 0, 0),
(49, '订单删除', 'orderform_delete', 24, 0, 0),
(50, '课程编辑', 'curriculum_edit', 26, 0, 1),
(51, '课程删除', 'curriculum_delete', 26, 0, 1),
(52, '账号编辑', 'account_edit', 29, 0, 1),
(53, '账号删除', 'account_delete', 29, 0, 1),
(54, '角色编辑', 'role_edit', 32, 0, 1),
(55, '角色删除', 'role_delete', 32, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_accessofrole`
--

CREATE TABLE IF NOT EXISTS `student_accessofrole` (
  `accessofrole_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色',
  `access_id` int(11) NOT NULL COMMENT '权限',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`accessofrole_id`),
  KEY `role_id` (`role_id`),
  KEY `access_id` (`access_id`),
  KEY `access_id_2` (`access_id`),
  KEY `access_id_3` (`access_id`),
  KEY `access_id_4` (`access_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='权限角色关系表' AUTO_INCREMENT=99 ;

--
-- 转存表中的数据 `student_accessofrole`
--

INSERT INTO `student_accessofrole` (`accessofrole_id`, `role_id`, `access_id`, `is_show`) VALUES
(3, 3, 54, 1),
(15, 3, 2, 1),
(16, 3, 36, 1),
(17, 3, 8, 1),
(18, 3, 37, 1),
(19, 3, 39, 1),
(20, 3, 6, 1),
(21, 3, 3, 1),
(22, 3, 5, 1),
(23, 3, 9, 1),
(24, 3, 38, 1),
(25, 3, 41, 1),
(26, 3, 40, 1),
(27, 3, 42, 1),
(28, 3, 12, 1),
(29, 3, 11, 1),
(30, 3, 43, 1),
(31, 3, 15, 1),
(32, 3, 45, 1),
(33, 3, 44, 1),
(34, 3, 14, 1),
(35, 3, 19, 1),
(36, 3, 17, 1),
(37, 3, 21, 1),
(38, 3, 23, 1),
(39, 3, 47, 1),
(40, 3, 46, 1),
(41, 3, 48, 1),
(42, 3, 27, 1),
(43, 3, 49, 1),
(44, 3, 25, 1),
(45, 3, 28, 1),
(46, 3, 50, 1),
(47, 3, 30, 1),
(48, 3, 51, 1),
(49, 3, 52, 1),
(50, 3, 54, 1),
(51, 3, 34, 1),
(52, 3, 31, 1),
(53, 3, 33, 1),
(54, 3, 53, 1),
(55, 3, 55, 1),
(71, 2, 5, 1),
(72, 2, 2, 1),
(73, 2, 9, 1),
(74, 2, 11, 1),
(75, 2, 8, 1),
(76, 2, 12, 1),
(77, 2, 43, 1),
(78, 2, 40, 1),
(79, 2, 42, 1),
(80, 2, 41, 1),
(81, 2, 14, 1),
(82, 2, 30, 1),
(83, 2, 27, 1),
(84, 2, 52, 1),
(85, 2, 53, 1),
(86, 1, 14, 1),
(87, 1, 11, 1),
(88, 1, 23, 1),
(89, 1, 15, 1),
(90, 1, 46, 1),
(91, 1, 47, 1),
(92, 1, 25, 1),
(93, 1, 49, 1),
(94, 1, 21, 1),
(95, 1, 19, 1),
(96, 1, 27, 1),
(97, 1, 30, 1),
(98, 1, 52, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_account`
--

CREATE TABLE IF NOT EXISTS `student_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account_account` varchar(45) DEFAULT NULL COMMENT '''账号名''',
  `account_pwd` varchar(45) DEFAULT NULL COMMENT '''密码''',
  `role_id` int(11) DEFAULT NULL COMMENT '账号拥有的权限   外键',
  `user_id` int(11) DEFAULT NULL COMMENT '谁的账号   外键',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`account_id`),
  KEY `fk_student_account_student_user1_idx` (`user_id`),
  KEY `fk_student_account_student_role1_idx` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `student_account`
--

INSERT INTO `student_account` (`account_id`, `account_account`, `account_pwd`, `role_id`, `user_id`, `is_show`) VALUES
(1, 'admin', '63a9f0ea7bb98050796b649e85481845', 3, 3, 1),
(2, 'student', '63a9f0ea7bb98050796b649e85481845', 1, 1, 1),
(3, 'teacher', '63a9f0ea7bb98050796b649e85481845', 2, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_chat`
--

CREATE TABLE IF NOT EXISTS `student_chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT '聊天人   外键  关联用户表',
  `other_id` int(11) DEFAULT NULL COMMENT '和谁聊天  外键  关联用户表',
  `chat_content` text COMMENT '聊天内容',
  `chat_time` int(11) DEFAULT NULL COMMENT '聊天时间',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`chat_id`),
  KEY `fk_student_chat_student_user1_idx` (`user_id`),
  KEY `fk_student_chat_student_user2_idx` (`other_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `student_chat`
--

INSERT INTO `student_chat` (`chat_id`, `user_id`, `other_id`, `chat_content`, `chat_time`, `is_show`) VALUES
(1, 1, 2, '哈哈哈哈啊啊', 123123123, 1),
(2, 5, 2, '哈哈哈哈啊啊', 123123123, 1),
(3, 1, 2, '哈哈哈哈啊啊', 123123123, 1),
(4, 1, 2, '哈哈哈哈啊啊', 123123123, 1),
(5, 1, 2, '哈哈哈哈啊啊', 123123123, 1),
(6, 1, 2, '哈哈哈哈啊啊', 123123123, 1),
(7, 1, 2, '哈哈哈哈啊啊', 123123123, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_class`
--

CREATE TABLE IF NOT EXISTS `student_class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `class_name` varchar(45) DEFAULT NULL COMMENT '班级名字',
  `user_id` int(11) DEFAULT NULL,
  `class_time` int(11) NOT NULL,
  `is_show` varchar(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`class_id`),
  KEY `fk_student_class_student_user1_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `student_class`
--

INSERT INTO `student_class` (`class_id`, `class_name`, `user_id`, `class_time`, `is_show`) VALUES
(1, 'H1801', 2, 1531872000, '1'),
(2, 'abc', 3, 1531872000, '1'),
(4, 'chris', 4, 1531872000, '1'),
(5, '12321312', 4, 1531526400, '1');

-- --------------------------------------------------------

--
-- 表的结构 `student_curriculum`
--

CREATE TABLE IF NOT EXISTS `student_curriculum` (
  `curriculum_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `curriculum_name` varchar(45) DEFAULT NULL COMMENT '课程名称',
  `curriculum_price` int(11) DEFAULT NULL COMMENT '课程价格',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`curriculum_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `student_curriculum`
--

INSERT INTO `student_curriculum` (`curriculum_id`, `curriculum_name`, `curriculum_price`, `is_show`) VALUES
(1, 'html', 100, 1),
(2, 'css', 150, 1),
(3, 'js', 500, 1),
(4, 'jq', 150, 1),
(5, 'vuejs', 1500, 1),
(6, 'nodejs123', 1500123, 1),
(7, '12321312', 0, 0),
(8, 'emmmmmmmmm', 2147483647, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_expense`
--

CREATE TABLE IF NOT EXISTS `student_expense` (
  `expense_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `expense_sum` int(11) DEFAULT NULL COMMENT '消费金额',
  `expense_time` int(11) DEFAULT NULL COMMENT '消费时间',
  `expense_describe` varchar(100) DEFAULT NULL COMMENT '消费备注信息',
  `user_id` int(11) DEFAULT NULL,
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`expense_id`),
  KEY `fk_student_expense_student_user1_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `student_expense`
--

INSERT INTO `student_expense` (`expense_id`, `expense_sum`, `expense_time`, `expense_describe`, `user_id`, `is_show`) VALUES
(1, 100, 123123, '报了html的课程', 1, 0),
(2, 100, 123123, '报了html的课程', 1, 0),
(3, 100, 123123, '报了html的课程', 1, 0),
(4, 100, 123123, '报了html的课程', 1, 1),
(5, 100, 123123, '报了html的课程', 1, 1),
(6, 100, 123123, '报了html的课程', 1, 1),
(7, 100, 123123, '报了html的课程', 1, 1),
(8, 100, 123123, '报了html的课程', 1, 1),
(9, 100, 123123, '报了html的课程', 1, 1),
(10, 100, 123123, '报了html的课程', 1, 1),
(11, 100, 123123, '报了html的课程', 1, 0),
(12, 100, 123123, '报了html的课程', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `student_feedback`
--

CREATE TABLE IF NOT EXISTS `student_feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `feedback_name` varchar(45) DEFAULT NULL COMMENT '反馈标题',
  `feedback_content` text COMMENT '反馈内容',
  `feedback_time` int(11) DEFAULT NULL COMMENT '反馈时间',
  `user_id` int(11) DEFAULT NULL COMMENT '反馈人   外键用户表',
  `class_id` int(11) DEFAULT NULL COMMENT '对哪个班级的反馈   外键',
  `teachar_id` int(11) DEFAULT NULL COMMENT '对哪个班级的反馈   外键',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`feedback_id`),
  KEY `fk_student_feedback_student_class1_idx` (`class_id`),
  KEY `fk_student_feedback_student_user1_idx` (`teachar_id`),
  KEY `fk_student_feedback_student_user2_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `student_feedback`
--

INSERT INTO `student_feedback` (`feedback_id`, `feedback_name`, `feedback_content`, `feedback_time`, `user_id`, `class_id`, `teachar_id`, `is_show`) VALUES
(1, '老师太胖了 , 哈哈哈啊啊啊哈哈啊哈哈', 'emmmmmmmmmm', 1532563200, 1, 2, 3, 1),
(2, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(3, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 0),
(4, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(5, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(6, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(7, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(8, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(9, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(10, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 0),
(11, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(12, '老师太胖了123321', 'emmmmmmmmmm', 1532563200, 1, 4, 3, 1),
(16, '3123', '                                						12312	\r\n							', 1531526400, 1, 2, 4, 1),
(17, 'emmmmmmmmmmmmmmmmmmmmmmm', '		emmmmmmmmmmmmmmmmmmmmmmmmm					', 1531440000, 1, 4, 4, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_firend`
--

CREATE TABLE IF NOT EXISTS `student_firend` (
  `firend_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '自己   外键  关联用户表',
  `firenduser_id` int(11) DEFAULT NULL COMMENT '朋友   外键  关联用户表',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`firend_id`),
  KEY `fk_student_firend_student_user2_idx` (`firenduser_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `student_firend`
--

INSERT INTO `student_firend` (`firend_id`, `user_id`, `firenduser_id`, `is_show`) VALUES
(1, 1, 3, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_homework`
--

CREATE TABLE IF NOT EXISTS `student_homework` (
  `homework_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `homework_name` varchar(150) DEFAULT NULL COMMENT '作业标题',
  `homework_content` text COMMENT '作业要求内容',
  `homework_time` int(11) DEFAULT NULL COMMENT '布置作业时间',
  `user_id` int(11) DEFAULT NULL COMMENT '布置作业的老师  外键',
  `class_id` int(11) DEFAULT NULL COMMENT '哪个班的作业  外键',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`homework_id`),
  KEY `fk_student_homework_student_class1_idx` (`class_id`),
  KEY `fk_student_homework_student_user1_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `student_homework`
--

INSERT INTO `student_homework` (`homework_id`, `homework_name`, `homework_content`, `homework_time`, `user_id`, `class_id`, `is_show`) VALUES
(1, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 4, 2, 0),
(2, '写一篇500字作文', '主题是大家都有什么梦想', 1532476800, 3, 4, 1),
(3, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 3, 4, 1),
(4, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 3, 2, 1),
(5, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 3, 2, 1),
(6, '写一篇500字作文', '主题是大家都有什么梦想', 1532476800, 7, 1, 1),
(7, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 2, 1, 1),
(8, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 4, 4, 1),
(9, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 4, 1, 1),
(10, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 1, 1, 1),
(11, '写一篇500字作文', '主题是大家都有什么梦想', 1532521997, 2, 4, 1),
(13, '竞技', '10分钟补满107刀, 一刀都不能漏', 1532476800, 10, 1, 1),
(14, '', '', 0, 1, 1, 1),
(15, '', '', 1532044800, 1, 1, 1),
(16, '21321', '12321321', 1531872000, 1, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_money`
--

CREATE TABLE IF NOT EXISTS `student_money` (
  `money_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '外键',
  `money_sum` int(11) DEFAULT NULL COMMENT '''用户金额''',
  `user_id` int(11) DEFAULT NULL,
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`money_id`),
  KEY `fk_student_money_student_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `student_notice`
--

CREATE TABLE IF NOT EXISTS `student_notice` (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `notice_title` varchar(100) DEFAULT NULL COMMENT '公告标题',
  `notice_content` text COMMENT '公告内容',
  `notice_time` int(11) DEFAULT NULL COMMENT '发布公告时间',
  `class_id` int(11) DEFAULT NULL COMMENT '哪个班的公告',
  `user_id` int(11) DEFAULT NULL COMMENT '发这个公告的老师',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`notice_id`),
  KEY `fk_student_notice_student_user1_idx` (`user_id`),
  KEY `fk_student_notice_student_class1_idx` (`class_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `student_notice`
--

INSERT INTO `student_notice` (`notice_id`, `notice_title`, `notice_content`, `notice_time`, `class_id`, `user_id`, `is_show`) VALUES
(1, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(2, '老师太胖了emmmmmmmmmmmmmm', '																挡住黑板看不到啊\r\n							\r\n							', 1532563200, 1, 1, 1),
(3, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(4, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(5, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(6, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(7, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(8, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(9, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(10, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(11, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(12, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(13, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(14, '老师太胖了', '挡住黑板看不到啊', 1532570473, 1, 1, 1),
(15, '测试数据', '233333333', 1532570473, 4, 4, 1),
(16, '而么么么么么么么么么么2131232131', '																		而咩咩咩咩咩咩咩咩咩咩咩		e			\r\n							\r\n							', 1531440000, 1, 4, 1),
(17, '21321', '		213123					', 1532102400, 1, 4, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_orderform`
--

CREATE TABLE IF NOT EXISTS `student_orderform` (
  `orderform_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `curriculum_id` int(11) DEFAULT NULL COMMENT '课程名称以及价格',
  `orderform_time` int(11) DEFAULT NULL COMMENT '下单时间',
  `user_id` int(11) DEFAULT NULL,
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`orderform_id`),
  KEY `fk_student_orderform_student_user1_idx` (`user_id`),
  KEY `curriculum_id` (`curriculum_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `student_orderform`
--

INSERT INTO `student_orderform` (`orderform_id`, `curriculum_id`, `orderform_time`, `user_id`, `is_show`) VALUES
(1, 2, 123123, 1, 1),
(2, 4, NULL, 1, 1),
(3, 3, NULL, 3, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_role`
--

CREATE TABLE IF NOT EXISTS `student_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_name` varchar(45) DEFAULT NULL COMMENT '''角色名''',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `student_role`
--

INSERT INTO `student_role` (`role_id`, `role_name`, `is_show`) VALUES
(1, '学生', 1),
(2, '老师', 1),
(3, '管理员', 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_stucurr`
--

CREATE TABLE IF NOT EXISTS `student_stucurr` (
  `user_id` int(11) NOT NULL COMMENT '报名课程学生',
  `curriculum_id` int(11) DEFAULT NULL COMMENT '所报课程',
  `stucurr_time` int(11) DEFAULT NULL COMMENT '报课程时间',
  `stucurr_id` int(11) NOT NULL AUTO_INCREMENT,
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`stucurr_id`),
  KEY `fk_student_stucurr_student_curriculum1_idx` (`curriculum_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `student_stucurr`
--

INSERT INTO `student_stucurr` (`user_id`, `curriculum_id`, `stucurr_time`, `stucurr_id`, `is_show`) VALUES
(1, 2, 123123123, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_system`
--

CREATE TABLE IF NOT EXISTS `student_system` (
  `system_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `system_title` varchar(45) DEFAULT NULL COMMENT '网页标题',
  `system_log` varchar(255) DEFAULT NULL COMMENT '网页标题log',
  `system_key` varchar(255) DEFAULT NULL COMMENT '网站关键字',
  `system_content` text COMMENT '网站主要内容',
  `system_copy` varchar(255) DEFAULT NULL COMMENT '版权信息',
  `system_phone` varchar(100) DEFAULT NULL COMMENT '网站联系电话',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `student_user`
--

CREATE TABLE IF NOT EXISTS `student_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(45) DEFAULT NULL COMMENT '''姓名''',
  `user_age` varchar(255) NOT NULL,
  `user_sex` int(11) DEFAULT NULL COMMENT '''性别''',
  `user_introduction` text COMMENT '''自我介绍''',
  `user_img` varchar(255) DEFAULT NULL COMMENT '''头像''',
  `user_time` int(11) DEFAULT NULL COMMENT '入职时间/入学时间',
  `user_phone` varchar(50) DEFAULT NULL COMMENT '''电话''',
  `usertype_id` int(11) NOT NULL DEFAULT '1' COMMENT '用户类型  外键',
  `is_show` int(11) NOT NULL DEFAULT '1' COMMENT '软删除 1显示   0 删除',
  PRIMARY KEY (`user_id`),
  KEY `fk_student_user_student_usertype_idx` (`usertype_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `student_user`
--

INSERT INTO `student_user` (`user_id`, `user_name`, `user_age`, `user_sex`, `user_introduction`, `user_img`, `user_time`, `user_phone`, `usertype_id`, `is_show`) VALUES
(1, 'Pig', '18', 1, '是一个普通的高中生', 'ajl-zTx_9uoOPQl_WuMuqswo.jpg', 1532390400, 'emmmmmmmmmmmmm', 1, 1),
(2, '方艳红', '18', 0, '一个普通的高中老师', 'jojwAYtWrSTu9J7OoI2COb_6.jpeg', 1532390400, '13333315555', 2, 1),
(3, '雷万钧', '18', 1, '有点电脑知识的IT人士', 'cL8h3NiISR1pmxePkB8YvFes.jpg', 1532390400, '13333315558', 2, 1),
(4, 'Jane Doe', '18', 0, '一个厉害的高中老师', 'Ken84p9IyVTBEK4-D3nlh9EG.jpg', 1532390400, '2333333333333', 2, 1),
(5, '小雷', '18', 1, '是一个优秀的高中生', 'b1Bjt8i4vxWE8Ztq8PEzhC6x.jpg', 1532390400, '13333333323', 1, 1),
(6, 'Chris', '18', 1, '是一个普通的高中生', 'placeholder.gif', 1532390400, '13333333322', 1, 1),
(7, 'Bob', '18', 1, '一个老实人', 'gu7g9oK1QVGnFNAv-oI5VJGj.jpg', 1532390400, '67958702', 1, 1),
(9, 'Henry', '18', 0, 'emmmmmmmm', 'zuLeceCf8yNSDdwtZSdFmimW.jpg', 1532390400, '659837410613', 1, 1),
(10, 'Eason', '18', 1, '一个数学"很好"的体育老师emmmmmmm', 'lYV5XhrBtN62i3xmHv1eDKOV.jpg', 1532390400, '6789304986506', 1, 1),
(17, '213213', '213213', 1, '                               \r\n      2132132132                      ', 'TJFQQT0Ajpxas60by79J-zkD.jpg', 0, '213213', 1, 0),
(18, '21321321', '21321321', 21321321, '                               \r\n                            ', 'TJFQQT0Ajpxas60by79J-zkD.jpg', 0, '21321321', 2, 1),
(19, '21321321', '2132132123', 0, '                               \r\n                            ', 'TJFQQT0Ajpxas60by79J-zkD.jpg', 0, ' ', 1, 0),
(20, '123413', '1231231', 0, '                               \r\n                            ', 'placeholder.gif', 0, ' 321131', 1, 1),
(21, 'Alan', '20', 1, '                               \r\n                            ', 'xX2_LuA_K14rfK33EkqokxRU.jpg', 1532217600, ' 56o93483294@gmail.com', 1, 1),
(22, 'Alice', '21', 0, '                               \r\n                            ', 'boNwxjEr5lmVwnoTteG7c_a5.jpg', 0, ' 12457990-5', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_userofclass`
--

CREATE TABLE IF NOT EXISTS `student_userofclass` (
  `userofclass_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '老师和学生     外键',
  `class_id` int(11) DEFAULT NULL COMMENT '所属班级       外键',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userofclass_id`),
  KEY `fk_student_userofclass_student_class1_idx` (`class_id`),
  KEY `user_id` (`user_id`),
  KEY `userofclass_id` (`userofclass_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `student_userofclass`
--

INSERT INTO `student_userofclass` (`userofclass_id`, `user_id`, `class_id`, `is_show`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(4, 4, 4, 1),
(11, 9, 2, 1),
(12, 10, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `student_usertype`
--

CREATE TABLE IF NOT EXISTS `student_usertype` (
  `usertype_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `usertype_name` varchar(45) DEFAULT NULL COMMENT '''用户类型名''',
  `is_show` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`usertype_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `student_usertype`
--

INSERT INTO `student_usertype` (`usertype_id`, `usertype_name`, `is_show`) VALUES
(1, '学生', 1),
(2, '老师', 1),
(3, '管理员', 1);

--
-- 限制导出的表
--

--
-- 限制表 `student_accessofrole`
--
ALTER TABLE `student_accessofrole`
  ADD CONSTRAINT `student_accessofrole_ibfk_4` FOREIGN KEY (`role_id`) REFERENCES `student_role` (`role_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_accessofrole_ibfk_5` FOREIGN KEY (`access_id`) REFERENCES `student_access` (`access_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `student_account`
--
ALTER TABLE `student_account`
  ADD CONSTRAINT `fk_student_account_student_role1` FOREIGN KEY (`role_id`) REFERENCES `student_role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_chat`
--
ALTER TABLE `student_chat`
  ADD CONSTRAINT `fk_student_chat_student_user1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_student_chat_student_user2` FOREIGN KEY (`other_id`) REFERENCES `student_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `student_class`
--
ALTER TABLE `student_class`
  ADD CONSTRAINT `fk_student_class_student_user1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `student_expense`
--
ALTER TABLE `student_expense`
  ADD CONSTRAINT `student_expense_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_feedback`
--
ALTER TABLE `student_feedback`
  ADD CONSTRAINT `fk_student_feedback_student_user1` FOREIGN KEY (`teachar_id`) REFERENCES `student_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_feedback_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `student_class` (`class_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_firend`
--
ALTER TABLE `student_firend`
  ADD CONSTRAINT `student_firend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_firend_ibfk_2` FOREIGN KEY (`firenduser_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE;

--
-- 限制表 `student_homework`
--
ALTER TABLE `student_homework`
  ADD CONSTRAINT `student_homework_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_homework_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `student_class` (`class_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_money`
--
ALTER TABLE `student_money`
  ADD CONSTRAINT `student_money_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_notice`
--
ALTER TABLE `student_notice`
  ADD CONSTRAINT `student_notice_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `student_class` (`class_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_notice_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_orderform`
--
ALTER TABLE `student_orderform`
  ADD CONSTRAINT `student_orderform_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `student_curriculum` (`curriculum_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_orderform_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_stucurr`
--
ALTER TABLE `student_stucurr`
  ADD CONSTRAINT `student_stucurr_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_stucurr_ibfk_6` FOREIGN KEY (`curriculum_id`) REFERENCES `student_curriculum` (`curriculum_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- 限制表 `student_user`
--
ALTER TABLE `student_user`
  ADD CONSTRAINT `fk_student_user_student_usertype` FOREIGN KEY (`usertype_id`) REFERENCES `student_usertype` (`usertype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `student_userofclass`
--
ALTER TABLE `student_userofclass`
  ADD CONSTRAINT `student_userofclass_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `student_class` (`class_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_userofclass_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `student_user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
