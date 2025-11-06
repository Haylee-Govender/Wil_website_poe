import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Pressable, ImageBackground, PressableStateCallbackType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sixMonthCourses } from '../data/courses';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * SixMonthCourses Screen References:
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
 * Image References Used in SixMonthCourses Screen:
 * Shuttershock.com, 22 April 2022. Sewing images. [electronic print]. 
 * Available at: <Arabian Man Designer Sewing Clothes On Stock Photo 1891968490 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Sewing course image)
 * 
 * Shuttershock.com, 30 June 2022. Landscaping images. [electronic print]. 
 * Available at: <Landscape Butchart Garden Spring Victoria British Stock Photo 76659253 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Landscaping course image)
 * 
 * Life Skills Creations Teaching Resources, 2021. Life Skills images. [electronic print]. 
 * Available at: <LIFE SKILLS> [Accessed 08 August 2025].
 * (Used for: Life Skills course image)
 * 
 * Physical sports aid, 2023. First Aid images. [electronic print]. 
 * Available at: <Sports Physio Kit | Physical Sports First Aid> [Accessed 08 August 2025].
 * (Used for: First Aid course image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Component References:
 * Course data structure and navigation patterns adapted from:
 * React Native Team, 2025. React Native Components and APIs. [online]
 * Available at: https://reactnative.dev/docs/components-and-apis [Accessed 04 November 2025].
 */

type SixMonthCoursesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SixMonthCourses'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const SixMonthCoursesScreen: React.FC = () => {
  const navigation = useNavigation<SixMonthCoursesScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRoute = 'SixMonthCourses';

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
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup');
  };

  const handleCoursePress = (courseId: string) => {
    const screenMap: { [key: string]: keyof RootStackParamList } = {
      'first-aid': 'FirstAidCourse',
      'sewing': 'SewingCourse',
      'landscaping': 'LandscapingCourse',
      'life-skills': 'LifeSkillsCourse',
    };

    const screenName = screenMap[courseId];
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      navigation.navigate('CourseSelection');
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  // Custom Course Card Component for Six-Month Courses
  const CourseCard = ({ course, onPress }: { course: any; onPress: () => void }) => (
    <Pressable 
      style={({ hovered }: PressableState) => [styles.courseCard, hovered && styles.courseCardHover]}
      onPress={onPress}
    >
      <View style={styles.courseImageContainer}>
        <Image source={course.image} style={styles.courseImage} />
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>
        <Text style={styles.coursePrice}>R{course.price}</Text>
        
        <View style={styles.courseDetails}>
          <View style={styles.detailItem}>
            <Icon name="clock-o" size={16} color="#004225" />
            <Text style={styles.detailText}>6 Months Duration</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="certificate" size={16} color="#004225" />
            <Text style={styles.detailText}>Certificate Provided</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="graduation-cap" size={16} color="#004225" />
            <Text style={styles.detailText}>
              {course.title === 'First Aid' && 'Practical Training'}
              {course.title === 'Sewing' && 'Hands-on Projects'}
              {course.title === 'Landscaping' && 'Practical Garden Work'}
              {course.title === 'Life Skills' && 'Interactive Workshops'}
            </Text>
          </View>
        </View>
        
        <Pressable
          style={({ hovered }: PressableState) => [styles.courseBtn, hovered && styles.courseBtnHover]}
          onPress={onPress}
        >
          <Text style={styles.courseBtnText}>LEARN MORE</Text>
        </Pressable>
      </View>
    </Pressable>
  );

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
          <Text style={styles.breadcrumbCurrent}>Six-Month Courses</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Six-Month Courses</Text>
        <Text style={styles.introText}>
          Our comprehensive six-month courses provide in-depth training and practical skills to help you excel in your chosen field. Each course is designed to give you the knowledge and confidence to succeed.
        </Text>

        {/* Course List - Matching HTML Layout */}
        <View style={styles.courseList}>
          {sixMonthCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => handleCoursePress(course.id)}
            />
          ))}
        </View>
      </View>

      {/* Why Choose Section - Moved below courses with gray background */}
      <View style={styles.whyChooseSection}>
        <View style={styles.whyChooseContent}>
          <Text style={styles.whyChooseTitle}>Why Choose Our Six-Month Courses?</Text>
          <Text style={styles.whyChooseText}>
            Our six-month courses are designed to provide comprehensive training that combines theoretical knowledge with practical application. 
            With experienced instructors and hands-on learning opportunities, you'll gain the skills and confidence needed to excel in your chosen field.
          </Text>
          <Text style={styles.whyChooseText}>
            All courses include certification upon successful completion, giving you a valuable credential to enhance your career prospects.
          </Text>
          <Pressable
            style={({ hovered }: PressableState) => [styles.btn, { alignSelf: 'center', marginTop: 20, width: 300, height: 40 }, hovered && styles.btnHover]}
            onPress={() => handleNavigation('Signup')}
          >
            <Text style={styles.btnText}>ENROLL NOW</Text>
          </Pressable>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60
    height: 80, // Increased from 60
    marginRight: 15,
  },
  orgName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004225',
  },
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '25%',
  },
  introText: {
    fontSize: 16,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    maxWidth: 800,
    alignSelf: 'center',
    width: '90%',
  },
  // Course List Styles
  courseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    marginTop: 30,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300,
    marginBottom: 30,
    overflow: 'hidden',
  },
  courseCardHover: {
    transform: [{ translateY: -5 }],
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  courseImageContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  courseContent: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 14,
    color: '#002a18',
    marginBottom: 15,
    lineHeight: 20,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 15,
  },
  courseDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#002a18',
    marginLeft: 10,
  },
  courseBtn: {
    backgroundColor: '#004225', // Changed to green
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    height: 45,
  },
  courseBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  courseBtnHover: {
    backgroundColor: '#002a18', // Darker green on hover
  },
  // Why Choose Section - Updated with gray background
  whyChooseSection: {
    backgroundColor: '#D9D9D9',
    padding: 40,
    marginTop: 20,
  },
  whyChooseContent: {
    maxWidth: 800,
    alignSelf: 'center',
    alignItems: 'center',
  },
  whyChooseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 20,
  },
  whyChooseText: {
    fontSize: 16,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  btn: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnHover: {
    backgroundColor: '#002a18',
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
  // Updated dropdown styles
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

export default SixMonthCoursesScreen;