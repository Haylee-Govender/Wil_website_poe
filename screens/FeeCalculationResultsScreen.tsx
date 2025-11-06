import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image, Linking, Pressable, PressableStateCallbackType, Modal } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

type FeeCalculationResultsScreenRouteProp = RouteProp<RootStackParamList, 'FeeCalculationResults'>;
type FeeCalculationResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList & { CourseSelection: { refresh?: boolean } }, 'FeeCalculationResults'>;
type PressableState = { pressed: boolean; hovered?: boolean };

interface Props {
  route: FeeCalculationResultsScreenRouteProp;
  navigation: FeeCalculationResultsScreenNavigationProp;
}

const FeeCalculationResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    personalInfo,
    selectedCourses,
    subtotal,
    discount,
    discountAmount,
    discountedSubtotal,
    vatAmount,
    total
  } = route.params;

  const activeRoute = 'FeeCalculationResults';

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
    setIsModalVisible(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('exp://10.0.0.4:8082');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Image source={require('../assets/images/LOGO.png')} style={styles.modalLogo} />
              <Text style={styles.modalTitle}>Access Our Mobile App</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                <Icon name="times" size={24} color="#004225" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalText}>
                To complete your enrollment and manage your courses on the go, download the Empowering the Nation mobile app.
              </Text>

              <View style={styles.expoGoContainer}>
                <Text style={styles.modalText}>
                  You can access the app by using Expo Go and inserting this URL:
                </Text>
                <View style={styles.urlContainer}>
                  <Text style={styles.urlText}>exp://10.0.0.4:8082</Text>
                </View>
                <Pressable
                  style={({ hovered }: PressableState) => [styles.copyButton, hovered && styles.copyButtonHover]}
                  onPress={copyToClipboard}
                >
                  <Icon name={copied ? "check" : "copy"} size={16} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.copyButtonText}>{copied ? 'Copied!' : 'Copy URL'}</Text>
                </Pressable>
              </View>

              <Text style={styles.modalFooterText}>
                Thank you for choosing to empower yourself with us!
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
          <TouchableOpacity onPress={() => handleNavigation('CourseSelection')}>
            <Text style={styles.breadcrumbLink}>Course Selection</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Fee Calculation</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fee Calculation Results</Text>
        
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Personal Information */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{personalInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{personalInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{personalInfo.email}</Text>
            </View>
          </View>
          
          {/* Selected Courses */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Selected Courses</Text>
            {selectedCourses.map((course: { id: string; name: string; price: number }) => (
              <View key={course.id} style={styles.courseRow}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.coursePrice}>R{course.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
          
          {/* Fee Breakdown */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Fee Breakdown</Text>
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Subtotal</Text>
              <Text style={styles.calculationValue}>R{subtotal.toFixed(2)}</Text>
            </View>
            
            {discount > 0 && (
              <>
                <View style={[styles.calculationRow, styles.discountRow]}>
                  <Text style={styles.calculationLabel}>Discount ({discount * 100}%)</Text>
                  <Text style={[styles.calculationValue, styles.discountValue]}>-R{discountAmount.toFixed(2)}</Text>
                </View>
                
                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>Discounted Subtotal</Text>
                  <Text style={styles.calculationValue}>R{discountedSubtotal.toFixed(2)}</Text>
                </View>
              </>
            )}
            
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>VAT (15%)</Text>
              <Text style={styles.calculationValue}>R{vatAmount.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.calculationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Fee</Text>
              <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable
              style={({ hovered }: PressableState) => [styles.enrollButton, hovered && styles.enrollButtonHover]}
              onPress={handleEnroll}
            >
              <Icon name="graduation-cap" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.enrollButtonText}>WISH TO ENROLL</Text>
            </Pressable>

            <Pressable
              style={({ hovered }: PressableState) => [styles.backButton, hovered && styles.backButtonHover]}
              onPress={() => navigation.navigate('CourseSelection', { refresh: true })}
            >
              <Text style={styles.backButtonText}>BACK TO COURSE SELECTION</Text>
            </Pressable>
          </View>
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
    width: 80,
    height: 80,
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
    fontSize: 20,
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
    color: '#0055a5',
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
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  // Content Container for Centralization
  contentContainer: {
    width: '100%',
    maxWidth: 800,
    alignItems: 'center',
  },
  // Info Cards
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 25,
    marginBottom: 25,
    width: '100%',
    maxWidth: 600,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002a18',
  },
  infoValue: {
    fontSize: 16,
    color: '#002a18',
    fontWeight: '500',
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  courseName: {
    fontSize: 16,
    color: '#002a18',
    flex: 1,
    marginRight: 10,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CFB53B',
    minWidth: 80,
    textAlign: 'right',
  },
  calculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calculationLabel: {
    fontSize: 16,
    color: '#002a18',
    fontWeight: '500',
  },
  calculationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002a18',
  },
  discountRow: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  discountValue: {
    color: '#CFB53B',
    fontWeight: 'bold',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#004225',
    marginTop: 15,
    paddingTop: 15,
    backgroundColor: 'rgba(0, 66, 37, 0.05)',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
  },
  // Buttons
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#004225',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
  },
  enrollButtonHover: {
    backgroundColor: '#002a18',
  },
  buttonIcon: {
    marginRight: 10,
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#004225',
    width: '100%',
    maxWidth: 400,
  },
  backButtonHover: {
    backgroundColor: 'rgba(0, 66, 37, 0.1)',
  },
  backButtonText: {
    color: '#004225',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Footer Styles
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#CFB53B',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    flex: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#002a18',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  appStoreButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginVertical: 20,
  },
  appStoreButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 180,
  },
  appStoreButtonHover: {
    backgroundColor: '#333',
  },
  appStoreButtonTextContainer: {
    marginLeft: 12,
  },
  appStoreButtonSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  appStoreButtonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalFooterText: {
    fontSize: 14,
    color: '#004225',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  expoGoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  urlContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  urlText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225',
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButtonHover: {
    backgroundColor: '#002a18',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeeCalculationResultsScreen;