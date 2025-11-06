import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Pressable, PressableStateCallbackType, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*reference links to the pictures guys. Pinterest, 2025. Pin: 320881542220542951. [online] Available at: <https://za.pinterest.com/pin/320881542220542951/> [Accessed 1November 2025]
Pinterest, 2025. Pin: 250794272993798934. [online] Available at: <https://za.pinterest.com/pin/250794272993798934/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 684687949635079876. [online] Available at: <https://za.pinterest.com/pin/684687949635079876/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174977846586. [online] Available at: <https://za.pinterest.com/pin/211174977846586/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 70650287899922509. [online] Available at: <https://za.pinterest.com/pin/70650287899922509/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 711991022380831995. [online] Available at: <https://za.pinterest.com/pin/711991022380831995/> [Accessed 1 November 2025
Pinterest, 2025. Pin: 1125968725265654. [online] Available at: <https://za.pinterest.com/pin/1125968725265654/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174978692598. [online] Available at: <https://za.pinterest.com/pin/211174978692598/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 89157267629136148. [online] Available at: <https://za.pinterest.com/pin/89157267629136148/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 4596627232152979456. [online] Available at: <https://za.pinterest.com/pin/4596627232152979456/> [Accessed 1 November 2025]
*/

type ChildMindingSixWeekScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChildMindingCourse'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const ChildMindingSixWeekScreen: React.FC = () => {
  const navigation = useNavigation<ChildMindingSixWeekScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRoute = 'ChildMindingCourse';

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
          <TouchableOpacity onPress={() => handleNavigation('SixWeekCourses')}>
            <Text style={styles.breadcrumbLink}>Six-Week Courses</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Child Minding</Text>
        </View>
      </View>

      {/* Hero Section with Background Image */}
      <ImageBackground
        source={require('../assets/images/child-minding-course.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Child Minding Training Program</Text>
            <Text style={styles.heroPrice}>R750</Text>
            <Text style={styles.heroDuration}>6-Week Comprehensive Certification Course</Text>
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
            Our 6-week Child Minding Training Program is designed to provide caregivers, parents, and professionals with the skills and knowledge needed to ensure the well-being, safety, and development of children. 
            This program combines practical experience with theoretical understanding in child care, development, and emergency response.
          </Text>
        </View>

        {/* Course Highlights Grid */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Course Highlights</Text>
          <View style={styles.highlightsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="child" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Child Development</Text>
              <Text style={styles.highlightDescription}>Understand child development stages and needs</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="medkit" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Safety & First Aid</Text>
              <Text style={styles.highlightDescription}>Essential safety practices and emergency response</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="cutlery" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Nutrition</Text>
              <Text style={styles.highlightDescription}>Healthy meal planning and dietary requirements</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.highlightItem, hovered && styles.highlightItemHover]}>
              <Icon name="certificate" size={40} color="#CFB53B" style={styles.highlightIcon} />
              <Text style={styles.highlightTitle}>Certification</Text>
              <Text style={styles.highlightDescription}>Nationally recognized qualification</Text>
            </Pressable>
          </View>
        </View>

        {/* Weekly Curriculum */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>6-Week Course Curriculum</Text>
          
          <View style={styles.curriculumContainer}>
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 1: Introduction to Child-Minding</Text>
              <Text style={styles.curriculumDescription}>Learn the core responsibilities and best practices of child-minding.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Overview of child-minding roles and duties</Text>
                <Text style={styles.curriculumPoint}>• Understanding child development stages</Text>
                <Text style={styles.curriculumPoint}>• Creating safe and nurturing environments</Text>
                <Text style={styles.curriculumPoint}>• Effective communication with children and parents</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 2: Child Safety and First Aid</Text>
              <Text style={styles.curriculumDescription}>Focus on essential safety practices and first aid skills.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Child safety and accident prevention</Text>
                <Text style={styles.curriculumPoint}>• Basic first aid: CPR, cuts, burns, choking</Text>
                <Text style={styles.curriculumPoint}>• Recognizing signs of illness and injury</Text>
                <Text style={styles.curriculumPoint}>• Emergency procedures and contacting services</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 3: Nutrition and Healthy Eating</Text>
              <Text style={styles.curriculumDescription}>Learn about nutritional needs and meal planning for children.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Basics of child nutrition and dietary requirements</Text>
                <Text style={styles.curriculumPoint}>• Planning balanced meals and snacks</Text>
                <Text style={styles.curriculumPoint}>• Addressing dietary concerns and allergies</Text>
                <Text style={styles.curriculumPoint}>• Safe food preparation and hygiene practices</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 4: Engaging Activities and Developmental Play</Text>
              <Text style={styles.curriculumDescription}>Explore age-appropriate activities that support development.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Benefits of play in child development</Text>
                <Text style={styles.curriculumPoint}>• Designing creative activities for various ages</Text>
                <Text style={styles.curriculumPoint}>• Encouraging social, emotional, and cognitive development</Text>
                <Text style={styles.curriculumPoint}>• Incorporating educational toys and resources</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 5: Behavior Management and Positive Discipline</Text>
              <Text style={styles.curriculumDescription}>Learn strategies for managing behavior and positive discipline.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Understanding child behavior and challenges</Text>
                <Text style={styles.curriculumPoint}>• Techniques for positive discipline and boundaries</Text>
                <Text style={styles.curriculumPoint}>• Strategies for managing challenging behaviors</Text>
                <Text style={styles.curriculumPoint}>• Building supportive relationships with children</Text>
              </View>
            </View>
            
            <View style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>Week 6: Communication with Parents and Professionals</Text>
              <Text style={styles.curriculumDescription}>Focus on effective communication strategies with parents.</Text>
              <View style={styles.curriculumPoints}>
                <Text style={styles.curriculumPoint}>• Best practices for communicating with parents</Text>
                <Text style={styles.curriculumPoint}>• Collaborating with caregivers and professionals</Text>
                <Text style={styles.curriculumPoint}>• Handling sensitive topics and feedback</Text>
                <Text style={styles.curriculumPoint}>• Documentation and reporting practices</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why Choose Our Child Minding Program</Text>
          <View style={styles.benefitsGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="graduation-cap" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Expert Instructors</Text>
              <Text style={styles.benefitText}>Learn from experienced child care professionals with years of practical experience in child development and care.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="handshake-o" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Hands-On Learning</Text>
              <Text style={styles.benefitText}>Practical exercises and real-life scenarios that prepare you for actual child-minding situations.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="user" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Personalized Guidance</Text>
              <Text style={styles.benefitText}>Feedback and support tailored to your specific needs and learning style throughout the program.</Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.benefitCard, hovered && styles.benefitCardHover]}>
              <Icon name="calendar" size={50} color="#000000ff" style={styles.benefitIcon} />
              <Text style={styles.benefitTitle}>Flexible Scheduling</Text>
              <Text style={styles.benefitText}>Classes available at various times to accommodate your work and personal commitments.</Text>
            </Pressable>
          </View>
        </View>

        {/* Target Audience */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Who Should Enroll</Text>
          <Text style={styles.audienceText}>
            This program is suitable for parents, caregivers, child care professionals, and anyone interested in enhancing their skills in child-minding. 
            Equip yourself with essential child-minding skills and provide exceptional care!
          </Text>
          <Text style={styles.audienceText}>
            Join us to become a confident and skilled child caregiver!
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Pressable
            style={({ hovered }: PressableState) => [styles.enrollButton, hovered && styles.enrollButtonHover]}
            onPress={handleEnroll}
          >
            <Text style={styles.enrollButtonText}>ENROLL NOW - R750</Text>
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
  // Target Audience
  audienceText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#002a18',
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 800,
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

export default ChildMindingSixWeekScreen;