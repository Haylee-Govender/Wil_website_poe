import React, { useState, useEffect } from 'react';
import {   View,   Text,   StyleSheet,  TextInput,  TouchableOpacity,   Alert,  Image,  ScrollView, Linking,   Pressable,  ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { findUserByEmail } from '../users';

/*
 * Login Screen References:
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
 * Image References Used in Login Screen:
 * Impofy, 2025. Educational Background images. [electronic print]. 
 * Available at: <Importance of Education - Impofy> [Accessed 08 August 2025].
 * (Used for: Login form background image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Authentication Components:
 * React Native Team, 2025. TextInput Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/textinput [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Alert API Documentation. [online]
 * Available at: https://reactnative.dev/docs/alert [Accessed 04 November 2025].
 * 
 * Secure credential handling based on:
 * React Native Community, 2025. React Native Keychain Documentation. [online]
 * Available at: https://github.com/oblador/react-native-keychain [Accessed 04 November 2025].
 * 
 * Data Storage and Session Management:
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
 * Security and Authentication:
 * Password authentication best practices from:
 * OWASP, 2023. Authentication Cheat Sheet. [online]
 * Available at: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html [Accessed 04 November 2025].
 * 
 * User session management based on:
 * IETF, 2023. Session Management Best Practices. [online]
 * Available at: https://www.ietf.org/rfc/rfc6265.txt [Accessed 04 November 2025].
 * 
 * Data Protection Compliance:
 * Protection of Personal Information Act (POPIA), 2023. [online]
 * Available at: https://www.justice.gov.za/inforeg/docs/InfoRegSA-POPIA-act2013-004.pdf [Accessed 04 November 2025].
 * 
 * Accessibility:
 * React Native Team, 2025. Accessibility in React Native. [online]
 * Available at: https://reactnative.dev/docs/accessibility [Accessed 04 November 2025].
 * 
 * User Experience Design:
 * Login form design principles based on:
 * Nielsen Norman Group, 2023. Login Form Design Guidelines. [online]
 * Available at: https://www.nngroup.com/articles/login-forms/ [Accessed 04 November 2025].
 * 
 * Error Handling and User Feedback:
 * User-friendly error messaging patterns from:
 * UX Design Institute, 2023. Error Message Design Best Practices. [online]
 * Available at: https://www.uxdesigninstitute.com/blog/error-message-design/ [Accessed 04 November 2025].
 */

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (route.params?.successMessage) {
      setSuccessMessage(route.params.successMessage);
    }
  }, [route.params?.successMessage]);

  useEffect(() => {
    const loadRememberedUser = async () => {
      try {
        const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
        const rememberPreference = await AsyncStorage.getItem('rememberMePreference');
        if (rememberedEmail && rememberPreference === 'true') {
          setEmail(rememberedEmail);
          setRememberMe(true);
        }
      } catch (e) {
        console.error('Failed to load user from storage', e);
      }
    };
    loadRememberedUser();
  }, []);
  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'MeetTheTeam', label: 'Meet The Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const handleLogin = async () => {
    const newErrors: { [key: string]: string } = {};

    // Input validation
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Find user and verify password
    const user = await findUserByEmail(email.trim());

    if (!user) {
      setErrors({ form: 'No account found with this email. Please sign up.' });
      return;
    }

    // In a real app, you would compare a hashed password.
    if (user.passwordHash !== password.trim()) {
      setErrors({ form: 'Incorrect password. Please try again.' });
      return;
    }

    // Handle "Remember Me"
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
        await AsyncStorage.setItem('rememberMePreference', 'true');
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
        await AsyncStorage.removeItem('rememberMePreference');
      }
    } catch (e) {
      console.error('Failed to save user to storage', e);
    }

    setSuccessMessage(`Login Successful! Welcome back, ${user.fullName}!`);
    // On successful login, you might navigate to a dashboard or home screen
    setTimeout(() => {
      setSuccessMessage('');
      navigation.navigate('Home');
    }, 2000);
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPasswordSubmit = async () => {
    if (!forgotPasswordEmail) {
      setForgotPasswordMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordEmail)) {
      setForgotPasswordMessage('Please enter a valid email address.');
      return;
    }

    setForgotPasswordMessage('Checking our records...');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = await findUserByEmail(forgotPasswordEmail);

    if (!user) {
      setForgotPasswordMessage('No account found with this email. Please check the email and try again.');
      return;
    }

    // --- Open Email Client ---
    const subject = 'Your Password for Empowering the Nation';
    const body = `
Hello ${user.fullName},

You requested your password for the Empowering the Nation portal.

Your password is: ${user.passwordHash}

---
This is a simulated email. In a real application, you would receive your actual password.
    `;
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(user.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const supported = await Linking.canOpenURL(emailUrl);
    if (supported) {
      await Linking.openURL(emailUrl);
      setForgotPasswordMessage('Your browser has been opened to send your password via Gmail.');
      setForgotPasswordSuccess(true);
    } else {
      Alert.alert('Error', 'We could not open your email client. Please send an email to info@empoweringthenation.org.za for assistance.');
      setForgotPasswordMessage('Could not open email client.');
    }
  };


  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const handlePortalLogin = () => {
    setShowDropdown(false);
  };

  const handlePortalSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      {showForgotPasswordForm && (
        <View style={styles.forgotPasswordOverlay}>
          <View style={styles.forgotPasswordCard}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                setShowForgotPasswordForm(false);
                setForgotPasswordEmail('');
                setForgotPasswordMessage('');
                setForgotPasswordSuccess(false);
              }}
            >
              <Icon name="times" size={20} color="#004225" />
            </TouchableOpacity>
            <Text style={styles.forgotPasswordTitle}>Forgot Password?</Text>
            <Text style={styles.forgotPasswordInstruction}>
              No problem! Enter your email address below and we'll send your password right over.
            </Text>

            {!forgotPasswordSuccess && (
              <>
                <TextInput
                  style={styles.forgotPasswordInput}
                  placeholder="Email Address"
                  placeholderTextColor="#666"
                  value={forgotPasswordEmail}
                  onChangeText={setForgotPasswordEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Pressable
                  style={({ hovered }: PressableState) => [styles.forgotPasswordButton, hovered && styles.forgotPasswordButtonHover]}
                  onPress={handleForgotPasswordSubmit}
                >
                  <Text style={styles.forgotPasswordButtonText}>SEND PASSWORD</Text>
                </Pressable>
              </>
            )}

            {forgotPasswordMessage ? (
              <Text style={[styles.forgotPasswordMessage, forgotPasswordSuccess && styles.forgotPasswordSuccessMessage]}>
                {forgotPasswordMessage}
              </Text>
            ) : null}
          </View>
        </View>
      )}


      <ImageBackground 
        source={require('../assets/images/login-background.jpg')} 
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
              <Text style={styles.breadcrumbCurrent}>Login</Text>
            </View>
          </View>

          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {/* Login Card with Logo - Positioned on the Right */}
            <View style={styles.loginCard}>
              {/* Logo in the login card */}
              <View style={styles.loginHeader}>
                <Image 
                  source={require('../assets/images/LOGO.png')} 
                  style={styles.loginLogo}
                />
                <Text style={styles.loginOrgName}>Empowering the Nation</Text>
                <Text style={styles.loginSubtitle}>Skills Development Portal</Text>
              </View>

              <Text style={styles.loginTitle}>Sign In</Text>
              <Text style={styles.loginInstruction}>Access your learning dashboard</Text>

              {successMessage ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>{successMessage}</Text>
                </View>
              ) : null}

              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={[styles.inputContainer, !!errors.email && styles.inputError]}>
                  <Icon name="envelope" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#666"
                    value={email}
                    onFocus={() => setSuccessMessage('')}
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

                {/* Password Input */}
                <View style={[styles.inputContainer, !!errors.password && styles.inputError]}>
                  <Icon name="lock" size={20} color="#004225" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword}
                    value={password}
                    onFocus={() => setSuccessMessage('')}
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
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {errors.form && (
                  <Text style={[styles.errorText, { textAlign: 'center', marginBottom: 15 }]}>{errors.form}</Text>
                )}

                {/* Remember Me & Forgot Password */}
                <View style={styles.rememberForgotContainer}>
                  <TouchableOpacity style={styles.rememberMe} onPress={() => setRememberMe(!rememberMe)}>
                    <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]}>
                      {rememberMe && <Icon name="check" size={12} color="#fff" />}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>
                  
                  <Pressable onPress={() => setShowForgotPasswordForm(true)}>
                    {({ hovered }: PressableState) => (
                      <Text style={[styles.forgotPassword, hovered && styles.forgotPasswordHover]}>Forgot password?</Text>
                    )}
                  </Pressable>
                </View>

                {/* Login Button */}
                <Pressable
                  style={({ hovered }: PressableState) => [styles.loginButton, hovered && styles.loginButtonHover]}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>LOGIN TO YOUR ACCOUNT</Text>
                </Pressable>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Sign Up Link */}
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <Pressable onPress={handleSignup}>
                    {({ hovered }: PressableState) => (
                      <Text style={[styles.signupLink, hovered && styles.signupLinkHover]}>Create one here</Text>
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
    minHeight: 500,
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
  // Login Card Styles - Updated for right side positioning
  loginCard: {
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
  loginHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  loginLogo: {
    width: 120, // Increased size
    height: 120, // Increased size
    marginBottom: 15,
  },
  loginOrgName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginInstruction: {
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#004225',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#004225',
    borderColor: '#004225',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotPassword: {
    color: '#004225',
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPasswordHover: {
    color: '#CFB53B',
  },
  loginButton: {
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
  loginButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  loginButtonText: {
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
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signupLink: {
    color: '#004225',
    fontWeight: 'bold',
  },
  signupLinkHover: {
    color: '#CFB53B',
  },
  errorText: {
    color: '#eb3941',
    fontSize: 13,
    marginBottom: 10,
  },
  successContainer: {
    backgroundColor: 'rgba(46, 139, 87, 0.1)',
    borderColor: '#2e8b57',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#2e8b57',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Forgot Password Overlay Styles
  forgotPasswordOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the left
    zIndex: 1000, // Ensure it's above other content
  },
  forgotPasswordCard: {
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
    maxWidth: 400,
    width: '90%',
    marginLeft: 20, // Position on the left
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  forgotPasswordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 10,
  },
  forgotPasswordInstruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotPasswordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
  },
  forgotPasswordMessage: {
    fontSize: 14,
    color: '#004225',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  forgotPasswordSuccessMessage: {
    color: '#2e8b57', // A success green color
    fontSize: 15,
    textAlign: 'center',
  },
  forgotPasswordButton: {
    backgroundColor: '#004225',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  forgotPasswordButtonHover: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.6,
  },
  forgotPasswordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default LoginScreen;