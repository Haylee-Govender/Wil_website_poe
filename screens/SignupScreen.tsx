import React, { useState } from 'react';
import {   View,   Text,   StyleSheet,   TextInput,   TouchableOpacity,   Alert,   Image,   ScrollView,   Linking,   Pressable,  ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { addUser, findUserByEmail } from '../users';

/*
 * Signup Screen References:
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
 * Image References Used in Signup Screen:
 * Freep!k, 2024. Educational Background images. [electronic print]. 
 * Available at: <Beautiful educational background with copy space | Premium AI-generated image> [Accessed 08 August 2025].
 * (Used for: Signup form background image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Form Components and Validation:
 * React Native Team, 2025. TextInput Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/textinput [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Alert API Documentation. [online]
 * Available at: https://reactnative.dev/docs/alert [Accessed 04 November 2025].
 * 
 * Form validation patterns based on:
 * MDN Web Docs, 2025. Form Validation Techniques. [online]
 * Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation [Accessed 04 November 2025].
 * 
 * Data Storage and Management:
 * React Native Team, 2025. AsyncStorage Documentation. [online]
 * Available at: https://reactnative.dev/docs/asyncstorage [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. State and Lifecycle in React Native. [online]
 * Available at: https://reactnative.dev/docs/state [Accessed 04 November 2025].
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Security and Privacy:
 * Password security standards based on:
 * OWASP, 2023. Password Storage Cheat Sheet. [online]
 * Available at: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html [Accessed 04 November 2025].
 * 
 * User Data Protection:
 * Compliance with South African data protection laws:
 * Protection of Personal Information Act (POPIA), 2023. [online]
 * Available at: https://www.justice.gov.za/inforeg/docs/InfoRegSA-POPIA-act2013-004.pdf [Accessed 04 November 2025].
 * 
 * Accessibility:
 * React Native Team, 2025. Accessibility in React Native. [online]
 * Available at: https://reactnative.dev/docs/accessibility [Accessed 04 November 2025].
 * 
 * User Experience Design:
 * Form design principles based on:
 * Nielsen Norman Group, 2023. Registration Form Design Guidelines. [online]
 * Available at: https://www.nngroup.com/articles/registration-forms/ [Accessed 04 November 2025].
 */

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredPolicy, setHoveredPolicy] = useState<'terms' | 'privacy' | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<'terms' | 'privacy' | null>(null);

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'MeetTheTeam', label: 'Meet The Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const handleSignup = async () => {
    const newErrors: { [key: string]: string } = {};

    // Input validation
    if (!fullName) newErrors.fullName = 'Full Name is required.';
    if (!email) newErrors.email = 'Email Address is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    if (phone.trim() && !/^0\d{9}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits and start with 0.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Terms and Conditions validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the Terms of Service and Privacy Policy.';
    }

    const existingUser = await findUserByEmail(email);
    if (email && !newErrors.email && existingUser) {
      newErrors.email = 'An account with this email already exists. Please log in.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // "Save" the user
    await addUser({ fullName, email, passwordHash: password }); // Storing password directly for simulation

    // Navigate to login screen after successful signup
    navigation.navigate('Login', { successMessage: 'Your account has been created successfully! Please log in.' });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const showTerms = () => {
    setModalContent('terms');
    setIsModalVisible(true);
  };

  const showPrivacy = () => {
    setModalContent('privacy');
    setIsModalVisible(true);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const handlePortalLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login');
  };

  const handlePortalSignup = () => {
    setShowDropdown(false);
    // Already on signup screen
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalContent === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                <Icon name="times" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {modalContent === 'terms' ? (
                <Text style={styles.modalText}>
                  <Text style={styles.modalSectionTitle}>1. Introduction</Text>{'\n'}
                  Welcome to Empowering the Nation. By creating an account, you agree to be bound by these Terms of Service. Please read them carefully.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>2. Use of Our Services</Text>{'\n'}
                  You agree to use our services for lawful purposes only. You must not use our services to harass, abuse, or harm another person or to transmit any content that is obscene or otherwise objectionable.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>3. Intellectual Property</Text>{'\n'}
                  All content provided on this platform, including courses, text, graphics, and logos, is the property of Empowering the Nation and is protected by copyright laws.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>4. Termination</Text>{'\n'}
                  We may terminate or suspend your account at any time, without prior notice or liability, for any reason, including if you breach these Terms.
                </Text>
              ) : (
                <Text style={styles.modalText}>
                  <Text style={styles.modalSectionTitle}>1. Information We Collect</Text>{'\n'}
                  We collect information you provide directly to us, such as when you create an account, enroll in a course, or communicate with us. This may include your name, email address, and phone number.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>2. How We Use Your Information</Text>{'\n'}
                  We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you related information, and respond to your comments and questions.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>3. Sharing of Information</Text>{'\n'}
                  We do not share your personal information with third parties except as necessary to provide our services or as required by law.
                  {'\n\n'}
                  <Text style={styles.modalSectionTitle}>4. Your Rights</Text>{'\n'}
                  You have the right to access, correct, or delete your personal information. Please contact us to make such a request.
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <ImageBackground 
        source={require('../assets/images/signin3-background.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Text style={styles.topBarText}>
              <Icon name="phone" size={20} /> +27 11 123 4567 | <Icon name="envelope" size={20} /> info@empoweringthenation.org.za
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
                    onPress={handlePortalLogin}
                  >
                    <Text style={styles.dropdownItemText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={handlePortalSignup}
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
              <Image source={require('../assets/images/LOGO.png')} style={styles.headerLogo} />
              <Text style={styles.orgName}>Empowering the Nation</Text>
            </View>
            <View style={styles.navMenu}>
              {navLinks.map((link) => {
                const isHovered = hoveredLink === link.name;
                return (
                  <Pressable
                    key={link.name}
                    onPress={() => handleNavigation(link.name)}
                    onHoverIn={() => setHoveredLink(link.name)}
                    onHoverOut={() => setHoveredLink(null)}
                    style={[styles.navLinkContainer, isHovered && styles.navLinkHoverActive]}
                  >
                    <Text style={[styles.navLink, isHovered && styles.navLinkTextHoverActive]}>{link.label}</Text>
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
              <Text style={styles.breadcrumbCurrent}>Sign Up</Text>
            </View>
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {/* Signup Card with Logo - Positioned on the Right */}
            <View style={styles.signupCard}>
              {/* Logo in the signup card */}
              <View style={styles.signupHeader}>
                <Image 
                  source={require('../assets/images/LOGO.png')} 
                  style={styles.signupLogo}
                />
                <Text style={styles.signupOrgName}>Empowering the Nation</Text>
                <Text style={styles.signupSubtitle}>Skills Development Portal</Text>
              </View>

              <Text style={styles.signupTitle}>Create Your Account</Text>
              <Text style={styles.signupInstruction}>Join our platform and start enrolling in courses today!</Text>

              <View style={styles.formContainer}>
                {/* Full Name Input */}
                <View style={[styles.inputContainer, !!errors.fullName && styles.inputError]}>
                  <Icon name="user" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#666"
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      if (errors.fullName) {
                        const newErrors = { ...errors };
                        delete newErrors.fullName;
                        setErrors(newErrors);
                      }
                    }}
                    autoCapitalize="words"
                  />
                </View>

                {/* Email Input */}
                <View style={[styles.inputContainer, !!errors.email && styles.inputError]}>
                  <Icon name="envelope" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) {
                        const newErrors = { ...errors };
                        delete newErrors.email;
                        setErrors(newErrors);
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Phone Number Input */}
                <View style={[styles.inputContainer, !!errors.phone && styles.inputError]}>
                  <Icon name="phone" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number (Optional)"
                    placeholderTextColor="#666"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      if (errors.phone) {
                        const newErrors = { ...errors };
                        delete newErrors.phone;
                        setErrors(newErrors);
                      }
                    }}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Password Input */}
                <View style={[styles.inputContainer, !!errors.password && styles.inputError]}>
                  <Icon name="lock" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        const newErrors = { ...errors };
                        delete newErrors.password;
                        setErrors(newErrors);
                      }
                    }}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon} 
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={[styles.inputContainer, !!errors.confirmPassword && styles.inputError]}>
                  <Icon name="lock" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#666"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errors.confirmPassword) {
                        const newErrors = { ...errors };
                        delete newErrors.confirmPassword;
                        setErrors(newErrors);
                      }
                    }}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon} 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>} 
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>} 


                {/* Terms and Conditions */}
                <View style={[styles.termsContainer, !!errors.terms && styles.inputError]}>
                  <TouchableOpacity 
                    style={styles.termsCheckbox} 
                    onPress={() => {
                      setTermsAccepted(!termsAccepted);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                    }}>
                    <View style={[styles.checkbox, termsAccepted && styles.checkboxSelected]}>
                      {termsAccepted && <Icon name="check" size={14} color="#fff" />}
                    </View>
                    <View style={styles.termsTextView}>
                      <Text style={styles.termsText}>
                        I agree to the{' '}
                        <Pressable
                          onPress={showTerms}
                          onHoverIn={() => setHoveredPolicy('terms')}
                          onHoverOut={() => setHoveredPolicy(null)}
                        >
                          <Text style={[styles.termsLink, hoveredPolicy === 'terms' && styles.termsLinkHover]}>
                            Terms of Service
                          </Text>
                        </Pressable>
                        {' '}and{' '}
                        <Pressable
                          onPress={showPrivacy}
                          onHoverIn={() => setHoveredPolicy('privacy')}
                          onHoverOut={() => setHoveredPolicy(null)}
                        >
                          <Text style={[styles.termsLink, hoveredPolicy === 'privacy' && styles.termsLinkHover]}>Privacy Policy</Text>
                        </Pressable>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Signup Button */}
                {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
                <Pressable
                  style={({ hovered }: PressableState) => [styles.signupButton, hovered && styles.signupButtonHover]}
                  onPress={handleSignup}
                >
                  <Text style={styles.signupButtonText}>CREATE ACCOUNT</Text>
                </Pressable>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <Pressable onPress={handleLogin}>
                    {({ hovered }: PressableState) => (
                      <Text style={[styles.loginLink, hovered && styles.loginLinkHover]}>Log in here</Text>
                    )}
                  </Pressable>
                </View>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 40,
    paddingHorizontal: 20,
    minHeight: 600,
  },
  // Top Bar Styles
  topBar: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 40,
    fontSize: 15,
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
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
  // Header Styles - Updated to match HomeScreen
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 999,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
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
  // Breadcrumb Styles
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
  // Signup Card Styles - Updated for right side positioning
  signupCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    maxWidth: 420,
    width: '90%',
    marginRight: 20,
    marginTop: 20,
  },
  signupHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  signupLogo: {
    width: 120, // Increased size
    height: 120, // Increased size
    marginBottom: 15,
  },
  signupOrgName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  signupSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  signupTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupInstruction: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 18,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: '#eb3941',
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  termsContainer: {
    marginBottom: 25,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
  },
  checkboxSelected: {
    backgroundColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
  },
  termsTextView: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  termsLink: {
    color: '#004225',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  termsLinkHover: {
    color: '#CFB53B',
  },
  signupButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  signupButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#004225',
    fontWeight: 'bold',
  },
  loginLinkHover: {
    color: '#CFB53B',
  },
  errorText: {
    color: '#eb3941',
    fontSize: 13,
    marginBottom: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 42, 24, 0.95)',
    borderRadius: 15,
    margin: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '40%',
    maxWidth: 600,
    height: '80%',
    borderWidth: 1,
    borderColor: '#CFB53B',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    flex: 1,
  },
  modalText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
  },
  modalSectionTitle: {
    fontWeight: 'bold',
    color: '#CFB53B',
  },
  // Footer Styles
  footer: {
    backgroundColor: '#002a18',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  footerColumn: {
    marginBottom: 20,
    flex: 1,
    minWidth: 250,
  },
  footerHeading: {
    color: '#fff',
    marginBottom: 15,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
    width: '80%',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  socialLink: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinkHover: {
    backgroundColor: '#CFB53B',
  },
  footerLink: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
  footerLinkHover: {
    color: '#CFB53B',
  },
  contactInfoItem: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    marginBottom: 10,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});

export default SignupScreen;