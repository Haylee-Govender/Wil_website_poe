import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Pressable, PressableStateCallbackType, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * LifeSkillsCourse Screen References:
 * 
 * Technical Documentation:
 * Microsoft, 2025. TypeScript Documentation – Get Started. [online] 
 * Available at: https://www.typescriptlang.org/docs/ [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Using TypeScript in React Native. [online] 
 * Available at: https://reactnative.dev/docs/typescript [Accessed 04 November 2025].
 * 
 * React Navigation Team, 2025. Getting Started – React Navigation. [online] 
 * Available at: https://reactnavigation.org/docs/getting-started/ [Accessed 04 November 2025].
 * 
 * React Navigation Team, 2025. Type Checking with TypeScript – React Navigation. [online] 
 * Available at: https://reactnavigation.org/docs/typescript/ [Accessed 04 November 2025].
 * 
 * W3Schools, 2025. React Native Tutorial. [online] 
 * Available at: https://www.w3schools.com/react/react_native_intro.asp [Accessed 04 November 2025].
 * 
 * Image References Used in LifeSkillsCourse Screen:
 * Life Skills Creations Teaching Resources, 2021. Life Skills images. [electronic print]. 
 * Available at: <LIFE SKILLS> [Accessed 08 August 2025].
 * (Used for: Course header image and life skills demonstration images)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Course Content References:
 * Life skills curriculum based on:
 * Department of Basic Education, 2023. Life Skills Curriculum Framework. [online]
 * Available at: https://www.education.gov.za/ [Accessed 04 November 2025].
 * 
 * Department of Social Development, 2023. Life Skills Training for Adults. [online]
 * Available at: https://www.dsd.gov.za/ [Accessed 04 November 2025].
 * 
 * South African Qualifications Authority, 2023. Life Skills Unit Standards. [online]
 * Available at: https://www.saqa.org.za/ [Accessed 04 November 2025].
 * 
 * Component References:
 * React Native Team, 2025. ScrollView Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/scrollview [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Modal Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/modal [Accessed 04 November 2025].
 * (Used for: Enrollment confirmation dialogs)
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Financial Literacy Content:
 * Based on National Treasury financial education guidelines:
 * National Treasury, 2023. Financial Literacy Framework. [online]
 * Available at: https://www.treasury.gov.za/ [Accessed 04 November 2025].
 * 
 * Communication Skills:
 * Adapted from workplace communication standards:
 * Services SETA, 2023. Communication Skills Training Standards. [online]
 * Available at: https://www.serviceseta.org.za/ [Accessed 04 November 2025].
 * 
 * Digital Literacy:
 * Based on national digital skills development initiatives:
 * Department of Communications and Digital Technologies, 2023. Digital Skills Program. [online]
 * Available at: https://www.dcdt.gov.za/ [Accessed 04 November 2025].
 * 
 * Entrepreneurship Skills:
 * Sourced from small business development guidelines:
 * Small Enterprise Development Agency, 2023. Entrepreneurship Training. [online]
 * Available at: https://www.seda.org.za/ [Accessed 04 November 2025].
 */

type LifeSkillsCourseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LifeSkillsCourse'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const LifeSkillsCourseScreen: React.FC = () => {
  const navigation = useNavigation<LifeSkillsCourseScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRoute = 'LifeSkillsCourse';

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'MeetTheTeam', label: 'Meet the Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login' as keyof RootStackParamList);
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup' as keyof RootStackParamList);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleEnroll = () => {
    navigation.navigate('CourseSelection');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>
          <Icon name="phone" size={16} /> +27 11 123 4567 | <Icon name="envelope" size={16} /> info@empoweringthenation.org.za
        </Text>
        {/* Dropdown Menu for Login/Signup */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            onPress={() => setShowDropdown(!showDropdown)}
            style={styles.dropdownTrigger}
          >
            <Icon name="bars" size={20} color="#fff" />
            <Icon name={showDropdown ? "caret-up" : "caret-down"} size={16} color="#fff" style={styles.dropdownCaret} />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={handleLogin}
              >
                <Text style={styles.dropdownItemText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={handleSignup}
              >
                <Text style={styles.dropdownItemText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
          <Text style={styles.orgName}>Empowering the Nation</Text>
        </View>
        <View style={styles.navMenu}>
          {navLinks.map((link) => {
            const isActive = activeRoute === link.name;
            const isHovered = hoveredLink === link.name;
            return (
              <Pressable
                key={link.name}
                onPress={() => handleNavigation(link.name)}
                onHoverIn={() => setHoveredLink(link.name)}
                onHoverOut={() => setHoveredLink(null)}
                style={[styles.navLinkContainer, (isActive || isHovered) && styles.navLinkHoverActive]}
              >
                <Text style={[styles.navLink, (isActive || isHovered) && styles.navLinkTextHoverActive]}>{link.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity onPress={() => handleNavigation('Home')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <TouchableOpacity onPress={() => handleNavigation('SixMonthCourses')}>
            <Text style={styles.breadcrumbLink}>Six-Month Courses</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Life Skills</Text>
        </View>
      </View>

      {/* Hero Section with Background Image */}
      <ImageBackground
        source={require('../assets/images/life-skills-course.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Life Skills Training Program</Text>
            <Text style={styles.heroPrice}>R1500</Text>
            <Text style={styles.heroDuration}>6-Month Comprehensive Certification Course</Text>
            <Pressable
              style={({ hovered }: PressableState) => [styles.heroButton, hovered && styles.heroButtonHover]}
              onPress={handleEnroll}
            >
              <Text style={styles.heroButtonText}>ENROLL NOW</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      
      {/* Main Content */}
      <View style={styles.section}>
        {/* Overview Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Program Overview</Text>
          <Text style={styles.description}>
            Our Life Skills Training Program is designed to equip individuals with essential practical skills needed for everyday living and personal development. 
            This comprehensive program covers a wide range of topics from financial literacy to home maintenance, providing you with the knowledge and confidence to handle various life situations effectively.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="money" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Financial Literacy</Text>
              <Text style={styles.highlightDescription}>Master budgeting, credit management, and financial planning</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="home" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Home Maintenance</Text>
              <Text style={styles.highlightDescription}>Learn essential repairs and maintenance skills</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="cutlery" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Cooking & Nutrition</Text>
              <Text style={styles.highlightDescription}>Prepare healthy meals and understand nutrition</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="certificate" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Certification</Text>
              <Text style={styles.highlightDescription}>Nationally recognized qualification</Text>
            </Pressable>
          </View>
        </View>

        {/* Detailed Curriculum */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Detailed Curriculum</Text>
          
          <View style={styles.curriculumContainer}>
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>1. Financial Literacy and Money Management</Text>
              <Text style={styles.curriculumDescription}>Develop skills to manage your finances effectively.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Budgeting and expense tracking techniques</Text>
                <Text style={styles.curriculumPoint}>• Understanding credit, loans, and debt management</Text>
                <Text style={styles.curriculumPoint}>• Basic investing principles and retirement planning</Text>
                <Text style={styles.curriculumPoint}>• Banking services and how to use them wisely</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>2. Basic Home Maintenance</Text>
              <Text style={styles.curriculumDescription}>Learn essential skills for maintaining your home.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basic plumbing repairs: fixing leaks, unclogging drains</Text>
                <Text style={styles.curriculumPoint}>• Electrical safety and simple repairs</Text>
                <Text style={styles.curriculumPoint}>• Painting techniques and wall repair</Text>
                <Text style={styles.curriculumPoint}>• Preventive maintenance for home systems</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>3. Cooking and Nutrition Fundamentals</Text>
              <Text style={styles.curriculumDescription}>Develop skills for preparing healthy, economical meals.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basic cooking techniques and kitchen safety</Text>
                <Text style={styles.curriculumPoint}>• Meal planning and grocery shopping on a budget</Text>
                <Text style={styles.curriculumPoint}>• Understanding nutrition labels and dietary needs</Text>
                <Text style={styles.curriculumPoint}>• Food storage and preservation methods</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>4. Time Management and Organization</Text>
              <Text style={styles.curriculumDescription}>Learn strategies to manage your time effectively.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Prioritization techniques and goal setting</Text>
                <Text style={styles.curriculumPoint}>• Creating effective schedules and routines</Text>
                <Text style={styles.curriculumPoint}>• Organizational systems for home and work</Text>
                <Text style={styles.curriculumPoint}>• Strategies for overcoming procrastination</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>5. Communication and Interpersonal Skills</Text>
              <Text style={styles.curriculumDescription}>Develop effective communication skills for personal and professional success.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Active listening and effective speaking techniques</Text>
                <Text style={styles.curriculumPoint}>• Conflict resolution and negotiation skills</Text>
                <Text style={styles.curriculumPoint}>• Building and maintaining healthy relationships</Text>
                <Text style={styles.curriculumPoint}>• Professional communication in workplace settings</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>6. Health and Wellness Practices</Text>
              <Text style={styles.curriculumDescription}>Learn to maintain physical and mental well-being.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basic first aid and emergency response</Text>
                <Text style={styles.curriculumPoint}>• Stress management techniques</Text>
                <Text style={styles.curriculumPoint}>• Developing healthy exercise and sleep habits</Text>
                <Text style={styles.curriculumPoint}>• Preventive healthcare and when to seek medical attention</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>7. Digital Literacy and Technology Skills</Text>
              <Text style={styles.curriculumDescription}>Develop essential technology skills for modern life.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basic computer operations and software use</Text>
                <Text style={styles.curriculumPoint}>• Internet safety and cybersecurity practices</Text>
                <Text style={styles.curriculumPoint}>• Using digital tools for communication and productivity</Text>
                <Text style={styles.curriculumPoint}>• Navigating online services and resources</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>8. Career Development and Job Readiness</Text>
              <Text style={styles.curriculumDescription}>Prepare for employment and career advancement.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Resume writing and interview techniques</Text>
                <Text style={styles.curriculumPoint}>• Professional etiquette and workplace behavior</Text>
                <Text style={styles.curriculumPoint}>• Job search strategies and networking</Text>
                <Text style={styles.curriculumPoint}>• Career planning and skill development</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why Choose Our Life Skills Program</Text>
          <View style={styles.benefitsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="book" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Comprehensive Curriculum</Text>
              <Text style={styles.benefitText}>Covers all essential areas of practical life skills from financial literacy to home maintenance.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="handshake-o" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Practical Approach</Text>
              <Text style={styles.benefitText}>Hands-on learning with real-world applications that you can use immediately in daily life.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="users" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Experienced Instructors</Text>
              <Text style={styles.benefitText}>Learn from professionals with expertise in each subject area and years of practical experience.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="globe" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Relevant Skills</Text>
              <Text style={styles.benefitText}>Learn skills that are immediately applicable to daily life and increase self-sufficiency.</Text>
            </Pressable>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>
            This program is ideal for young adults preparing for independent living, individuals seeking to improve their daily life management skills, 
            anyone looking to increase their self-sufficiency, and those wanting to build confidence in handling various life situations.
          </Text>
          <Text style={styles.audienceText}>
            Join us to develop essential life skills that will serve you for a lifetime!
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Pressable
            style={({ hovered }: PressableState) => [styles.enrollButton, hovered && styles.enrollButtonHover]}
            onPress={handleEnroll}
          >
            <Text style={styles.enrollButtonText}>ENROLL NOW - R1500</Text>
          </Pressable>
          <Text style={styles.ctaSubtext}>Limited spots available for next intake</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerGrid}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Empowering the Nation</Text>
            <Text style={styles.footerText}>Transforming lives through skills development and education since 2018.</Text>
            <View style={styles.socialLinks}>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://facebook.com')}>
                <Icon name="facebook-f" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://twitter.com')}>
                <Icon name="twitter" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://instagram.com')}>
                <Icon name="instagram" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://linkedin.com')}>
                <Icon name="linkedin" size={16} color="#fff" />
              </Pressable>
            </View>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <Pressable onPress={() => handleNavigation('Home')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Home</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixMonthCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Month Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixWeekCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Week Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('CourseSelection')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Course Selection</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('Contact')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Contact Us</Text>}
            </Pressable>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Contact Info</Text>
            <Text style={styles.contactInfoItem}>
              <Icon name="map-marker" size={16} color="#CFB53B" /> 123 Education St, Johannesburg, South Africa
            </Text>
            <Text style={styles.contactInfoItem}>
              <Icon name="phone" size={16} color="#CFB53B" /> +27 11 123 4567
            </Text>
            <Text style={styles.contactInfoItem}>
              <Icon name="envelope" size={16} color="#CFB53B" /> info@empoweringthenation.org.za
            </Text>
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>&copy; 2025 Empowering the Nation. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  topBar: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 40,
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
  topBarLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarLinkText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    right: 200,
    top: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // UPDATED LOGO CONTAINER TO MATCH COURSESELECTIONSCREEN
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60 to match CourseSelectionScreen
    height: 80, // Increased from 60 to match CourseSelectionScreen
    marginRight: 15,
  },
  orgName: {
    fontSize: 28, // Increased from 24 to match CourseSelectionScreen
    fontWeight: '700',
    color: '#004225',
  },
  // UPDATED NAV MENU TO MATCH COURSESELECTIONSCREEN
  navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2,
  },
  navLinkContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize: 20, // Reduced from 18 
    color: '#000000ff',
    fontWeight: '500',
    textAlign: 'center',
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  },
  breadcrumb: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 5,
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: '#000000ff',
  },
  // Hero Section with Background Image
  hero: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDuration: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    height: 60,
  },
  heroButtonHover: {
    backgroundColor: '#002a18',
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  contentSection: {
    marginBottom: 40,
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    textAlign: 'center',
    width: '50%',
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#002a18',
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 800,
  },
  // Course Highlights
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  highlightItem: {
    backgroundColor: '#004225',
    flex: 1,
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 4,
    borderTopColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 250,
    maxWidth: 280,
    height: 250,
  },
  highlightItemHover: {
    transform: [{ translateY: -5 }],
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderTopColor: '#CFB53B',
  },
  highlightIcon: {
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 15,
    textAlign: 'center',
  },
  highlightDescription: {
    fontSize: 16,
    color: '#CFB53B',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Curriculum
  curriculumContainer: {
    width: '100%',
    maxWidth: 800,
    alignItems: 'center',
  },
  curriculumItem: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#004225',
    width: '100%',
  },
  curriculumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
    textAlign: 'center',
  },
  curriculumDescription: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  curriculumPoints: {
    marginLeft: 10,
  },
  curriculumPoint: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 8,
    lineHeight: 24,
  },
  projectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    marginTop: 15,
    marginBottom: 5,
  },
  projectText: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  audienceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    marginTop: 10,
    marginBottom: 5,
  },
  audienceText: {
    fontSize: 16,
    color: '#002a18',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  // Benefits Section
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
  },
  benefitCard: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 4,
    borderTopColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 350,
    minWidth: 250,
    maxWidth: 280,
  },
  benefitCardHover: {
    transform: [{ translateY: -5}],
    shadowOpacity: 0.5,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    borderTopColor: '#CFB53B',
    backgroundColor: '#c4c4c4',
  },
  benefitIcon: {
    marginBottom: 25,
  },
  benefitTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 16,
    color: '#004225',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // CTA Section
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    maxWidth: 800,
  },
  enrollButton: {
    backgroundColor: '#004225',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
    minWidth: 300,
    height: 60,
  },
  enrollButtonHover: {
    backgroundColor: '#002a18',
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ctaSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#002a18',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  footerColumn: {
    marginBottom: 20,
    flex: 1,
    minWidth: 250,
    left: 100,
    right: 100,
  },
  footerHeading: {
    color: '#fff',
    marginBottom: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#CFB53B',
    width: 200,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  socialLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinkHover: {
    backgroundColor: '#CFB53B',
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  footerLinkHover: {
    color: '#CFB53B',
  },
  contactInfoItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 20,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  // Dropdown styles
  dropdownContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    right: 200,
    top: 8,
  },
  dropdownCaret: {
    marginLeft: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1002,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '500',
  },
});

export default LifeSkillsCourseScreen;