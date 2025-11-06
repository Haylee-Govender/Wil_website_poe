import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Pressable, PressableStateCallbackType, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * SewingCourse Screen References:
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
 * Image References Used in SewingCourse Screen:
 * Shuttershock.com, 22 April 2022. Sewing images. [electronic print]. 
 * Available at: <Arabian Man Designer Sewing Clothes On Stock Photo 1891968490 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Course header image and sewing demonstration images)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Course Content References:
 * Sewing and garment construction curriculum based on:
 * Fibre Processing and Manufacturing SETA, 2023. Clothing and Textile Training Standards. [online]
 * Available at: https://www.fpmseta.org.za/ [Accessed 04 November 2025].
 * 
 * Department of Higher Education and Training, 2023. National Certificate in Clothing Production. [online]
 * Available at: https://www.dhet.gov.za/ [Accessed 04 November 2025].
 * 
 * South African Qualifications Authority, 2023. Apparel Production Qualifications. [online]
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
 * Course Modules and Skills:
 * Based on industry-standard sewing techniques from:
 * Clothing Industry Training Board, 2023. Garment Construction Guidelines. [online]
 * Available at: https://www.clothing.org.za/ [Accessed 04 November 2025].
 * 
 * Equipment Requirements:
 * Sourced from local South African sewing equipment suppliers:
 * Singer South Africa, 2023. Sewing Machine Specifications and Requirements. [online]
 * Available at: https://www.singer.co.za/ [Accessed 04 November 2025].
 */

type SewingCourseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SewingCourse'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const SewingCourseScreen: React.FC = () => {
  const navigation = useNavigation<SewingCourseScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRoute = 'SewingCourse';

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
          <Text style={styles.breadcrumbCurrent}>Sewing</Text>
        </View>
      </View>

      {/* Hero Section with Background Image */}
      <ImageBackground
        source={require('../assets/images/sewing-course.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Sewing Training Program</Text>
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
            Our Sewing Training Program offers a comprehensive series of classes designed for all skill levels, from beginners to advanced sewers. 
            Whether you're looking to learn the basics, enhance your skills, or master advanced techniques, our program provides hands-on instruction and practical experience to help you achieve your sewing goals.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="scissors" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Beginner to Advanced</Text>
              <Text style={styles.highlightDescription}>Comprehensive training for all skill levels</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="trophy" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Hands-On Projects</Text>
              <Text style={styles.highlightDescription}>Practical experience with real projects</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="recycle" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Sustainable Sewing</Text>
              <Text style={styles.highlightDescription}>Learn upcycling and repair techniques</Text>
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
              <Text style={styles.curriculumTitle}>1. Introduction to Sewing: Basics and Beyond</Text>
              <Text style={styles.curriculumDescription}>Perfect for beginners who want to start sewing from scratch.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Overview of sewing machines and tools</Text>
                <Text style={styles.curriculumPoint}>• Basic sewing techniques: stitching, hemming, and seaming</Text>
                <Text style={styles.curriculumPoint}>• Introduction to different fabrics and patterns</Text>
                <Text style={styles.curriculumPoint}>• Simple projects such as tote bags or pillowcases</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Develop a basic sewing project using fundamental techniques</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Beginners who want to build a strong foundation in sewing and gain confidence with their sewing machine</Text>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>2. Sewing Techniques for Intermediate Learners</Text>
              <Text style={styles.curriculumDescription}>Build on your basic skills with more complex projects.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Advanced stitching techniques: zippers, buttonholes, and pockets</Text>
                <Text style={styles.curriculumPoint}>• Working with patterns and fitting garments</Text>
                <Text style={styles.curriculumPoint}>• Introduction to sewing with specialty fabrics</Text>
                <Text style={styles.curriculumPoint}>• Projects include simple garments or accessories</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Create a garment or accessory using intermediate techniques</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Individuals who have basic sewing knowledge and want to expand their skills</Text>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>3. Advanced Sewing Techniques and Custom Fit</Text>
              <Text style={styles.curriculumDescription}>Refine your skills and create professional-quality garments.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Tailoring and custom fitting techniques</Text>
                <Text style={styles.curriculumPoint}>• Advanced garment construction, including linings and facings</Text>
                <Text style={styles.curriculumPoint}>• Techniques for working with complex fabrics</Text>
                <Text style={styles.curriculumPoint}>• Projects include tailored jackets or fitted dresses</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Create a professionally tailored garment with custom fitting</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Experienced sewers looking to enhance their skills and create high-quality garments</Text>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>4. Creative Sewing Projects: Accessories and Home Décor</Text>
              <Text style={styles.curriculumDescription}>Explore your creativity with unique sewing projects.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Creating accessories like handbags, scarves, and hats</Text>
                <Text style={styles.curriculumPoint}>• Sewing home décor items such as cushions and curtains</Text>
                <Text style={styles.curriculumPoint}>• Techniques for embellishing and personalizing projects</Text>
                <Text style={styles.curriculumPoint}>• Opportunities to develop your own designs</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Design and create a unique accessory or home décor item</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Seamstresses interested in applying their skills to creative projects</Text>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>5. Sewing for Sustainability: Upcycling and Repair</Text>
              <Text style={styles.curriculumDescription}>Learn sustainable sewing practices and give new life to old garments.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Techniques for repairing and altering garments</Text>
                <Text style={styles.curriculumPoint}>• Upcycling old clothes into new fashion pieces</Text>
                <Text style={styles.curriculumPoint}>• Using scraps and remnants creatively</Text>
                <Text style={styles.curriculumPoint}>• Sustainable fashion practices</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Transform an old garment into a new fashion piece through upcycling</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Those interested in sustainable fashion and eco-friendly practices</Text>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>6. Specialty Sewing: Quilting and Embroidery</Text>
              <Text style={styles.curriculumDescription}>Dive into specialized sewing techniques with a focus on quilting and embroidery.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basic and advanced quilting techniques</Text>
                <Text style={styles.curriculumPoint}>• Introduction to embroidery: hand and machine techniques</Text>
                <Text style={styles.curriculumPoint}>• Creating intricate designs and patterns</Text>
                <Text style={styles.curriculumPoint}>• Projects include quilted blankets or embroidered artworks</Text>
              </View>
              <Text style={styles.projectLabel}>Hands-On Project:</Text>
              <Text style={styles.projectText}>Complete a quilted or embroidered project showcasing specialized techniques</Text>
              <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
              <Text style={styles.audienceText}>Sewers interested in exploring specialized areas of sewing and artistic projects</Text>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why Choose Our Sewing Program</Text>
          <View style={styles.benefitsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="user" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Instructors</Text>
              <Text style={styles.benefitText}>Learn from experienced sewers with years of industry knowledge and teaching experience.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="handshake-o" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Hands-On Learning</Text>
              <Text style={styles.benefitText}>Gain practical experience through projects tailored to your skill level with individual attention.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="calendar" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Schedule</Text>
              <Text style={styles.benefitText}>Options for evening and weekend classes to fit your busy lifestyle and commitments.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="home" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Take Home Projects</Text>
              <Text style={styles.benefitText}>Keep all the beautiful projects you create during the course as part of your growing portfolio.</Text>
            </Pressable>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>
            This program is ideal for anyone interested in learning to sew, from complete beginners to experienced sewers looking to refine their skills. 
            Whether you want to create your own clothes, start a small business, or simply enjoy a creative hobby, our program will provide the skills and confidence you need.
          </Text>
          <Text style={styles.audienceText}>
            Join us to master the art of sewing and unlock your creative potential!
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

export default SewingCourseScreen;