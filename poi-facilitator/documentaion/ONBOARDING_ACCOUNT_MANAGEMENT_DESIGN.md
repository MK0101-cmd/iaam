# Points of You AI Studio - Onboarding and Account Management System Design

## Document Overview

This document provides a comprehensive design for the facilitators and participants onboarding and account management system for Points of You AI Studio, including new user registration, email verification, password reset, and role-based account management.

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [User Roles and Access Tiers](#user-roles-and-access-tiers)
3. [Registration and Onboarding Flows](#registration-and-onboarding-flows)
4. [Email Verification System](#email-verification-system)
5. [Password Reset Flow](#password-reset-flow)
6. [Account Management Dashboard](#account-management-dashboard)
7. [Multi-Tenant Organization Management](#multi-tenant-organization-management)
8. [Technical Implementation](#technical-implementation)
9. [Security and Privacy](#security-and-privacy)
10. [Multilingual Support](#multilingual-support)

---

## System Architecture Overview

### Core Components

```typescript
interface OnboardingSystem {
  userRegistration: UserRegistrationService;
  emailVerification: EmailVerificationService;
  passwordReset: PasswordResetService;
  accountManagement: AccountManagementService;
  organizationManagement: OrganizationManagementService;
  roleBasedAccess: RoleBasedAccessService;
  multilingualSupport: MultilingualService;
}
```

### User Journey Overview

```
New User → Registration → Email Verification → Role Selection → 
Onboarding Flow → Account Setup → Dashboard Access → Ongoing Management
```

---

## User Roles and Access Tiers

### Primary User Roles

#### 1. Facilitator/Coach
```typescript
interface FacilitatorRole {
  permissions: [
    "create_sessions",
    "manage_participants", 
    "access_ai_copilot",
    "view_analytics",
    "create_journeys",
    "manage_content"
  ];
  accessTier: "PROFESSIONAL" | "ENTERPRISE" | "OFFICIAL_POY";
  features: {
    sessionManagement: boolean;
    aiCoaching: boolean;
    analytics: boolean;
    contentLibrary: boolean;
    breakoutRooms: boolean;
  };
}
```

#### 2. Participant
```typescript
interface ParticipantRole {
  permissions: [
    "join_sessions",
    "access_journal",
    "use_ai_coach",
    "view_progress",
    "manage_profile"
  ];
  accessTier: "FREE" | "PROFESSIONAL";
  features: {
    sessionParticipation: boolean;
    digitalJournal: boolean;
    aiCoach: boolean;
    progressTracking: boolean;
  };
}
```

#### 3. Organization Admin
```typescript
interface OrganizationAdminRole {
  permissions: [
    "manage_organization",
    "invite_users",
    "view_org_analytics",
    "manage_billing",
    "configure_settings"
  ];
  accessTier: "ENTERPRISE";
  features: {
    userManagement: boolean;
    billingManagement: boolean;
    organizationAnalytics: boolean;
    customBranding: boolean;
  };
}
```

#### 4. Educator
```typescript
interface EducatorRole {
  permissions: [
    "create_educational_sessions",
    "manage_students",
    "access_educational_content",
    "view_student_progress"
  ];
  accessTier: "PROFESSIONAL" | "ENTERPRISE";
  features: {
    classroomManagement: boolean;
    studentProgress: boolean;
    educationalContent: boolean;
    gradeIntegration: boolean;
  };
}
```

### Access Tier Definitions

#### FREE Tier
- Basic participant access
- Limited session participation
- Basic AI coach interactions
- Personal journal (limited entries)

#### PROFESSIONAL Tier
- Full facilitator capabilities
- Unlimited sessions
- Advanced AI features
- Complete content library access
- Analytics and reporting

#### ENTERPRISE Tier
- Multi-tenant organization management
- Custom branding
- Advanced analytics
- SSO integration
- Priority support

#### OFFICIAL_POY Tier
- Licensed Points of You facilitator
- Access to proprietary content
- Advanced methodology tools
- Certification tracking

---

## Registration and Onboarding Flows

### Universal Registration Flow

#### Step 1: Initial Registration
```typescript
interface RegistrationForm {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  preferences: {
    language: "en" | "es" | "fr" | "de" | "he";
    timezone: string;
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  marketing: {
    acceptMarketing: boolean;
    referralSource?: string;
  };
}
```

#### Step 2: Email Verification
- Send verification email with secure token
- User clicks verification link
- Account activated upon verification
- Fallback: manual verification code entry

#### Step 3: Role Selection
```typescript
interface RoleSelectionStep {
  primaryRole: "facilitator" | "participant" | "educator" | "organization_admin";
  useCase: string;
  experience: "beginner" | "intermediate" | "advanced";
  organizationCode?: string; // For joining existing organizations
}
```

### Role-Specific Onboarding Flows

#### Facilitator Onboarding
```typescript
interface FacilitatorOnboarding {
  step1: {
    professionalInfo: {
      title: string;
      organization: string;
      experienceLevel: "new" | "experienced" | "certified";
      certifications?: string[];
    };
  };
  step2: {
    sessionPreferences: {
      typicalSessionSize: number;
      sessionTypes: string[];
      industries: string[];
    };
  };
  step3: {
    toolPreferences: {
      videoProvider: "zoom" | "teams" | "both";
      aiCoachingLevel: "basic" | "advanced";
      analyticsPreferences: string[];
    };
  };
  step4: {
    firstSessionSetup: {
      createSampleJourney: boolean;
      scheduleDemo: boolean;
      inviteParticipants: boolean;
    };
  };
}
```

#### Participant Onboarding
```typescript
interface ParticipantOnboarding {
  step1: {
    personalGoals: {
      primaryGoals: string[];
      focusAreas: string[];
      timeCommitment: "light" | "regular" | "intensive";
    };
  };
  step2: {
    journalSetup: {
      journalName: string;
      reflectionFrequency: "daily" | "weekly" | "session-based";
      privacyLevel: "private" | "shared-with-facilitator" | "public";
    };
  };
  step3: {
    aiCoachPreferences: {
      coachingStyle: "supportive" | "challenging" | "balanced";
      interactionFrequency: "high" | "medium" | "low";
      topicInterests: string[];
    };
  };
  step4: {
    firstSteps: {
      completeProfileAssessment: boolean;
      joinFirstSession: boolean;
      exploreContentLibrary: boolean;
    };
  };
}
```

#### Organization Admin Onboarding
```typescript
interface OrganizationAdminOnboarding {
  step1: {
    organizationSetup: {
      organizationName: string;
      organizationType: "corporate" | "educational" | "nonprofit" | "healthcare";
      size: "small" | "medium" | "large" | "enterprise";
      domain: string;
    };
  };
  step2: {
    brandingSetup: {
      logo?: File;
      primaryColor: string;
      secondaryColor: string;
      customDomain?: string;
    };
  };
  step3: {
    userManagement: {
      inviteInitialUsers: {
        facilitators: string[];
        participants: string[];
      };
      ssoConfiguration?: {
        provider: "saml" | "oauth" | "ldap";
        settings: object;
      };
    };
  };
  step4: {
    billingSetup: {
      billingContact: ContactInfo;
      paymentMethod: PaymentMethod;
      subscriptionTier: "professional" | "enterprise";
    };
  };
}
```

---

## Email Verification System

### Verification Flow Design

#### New User Registration Verification
```typescript
interface EmailVerificationFlow {
  trigger: "user_registration" | "email_change" | "password_reset";
  
  generateToken(): {
    token: string; // Cryptographically secure random token
    expiresAt: Date; // 24 hours for registration, 1 hour for password reset
    userId: string;
    email: string;
    purpose: string;
  };
  
  sendVerificationEmail(token: VerificationToken): {
    to: string;
    subject: string; // Localized based on user language preference
    template: "registration_verification" | "email_change" | "password_reset";
    variables: {
      firstName: string;
      verificationLink: string;
      expirationTime: string;
      supportEmail: string;
    };
  };
  
  verifyToken(token: string): {
    valid: boolean;
    expired: boolean;
    user: User | null;
    action: "activate_account" | "change_email" | "reset_password";
  };
}
```

#### Email Templates (Multilingual)

##### Registration Verification Email
```html
<!-- English Template -->
<div class="email-container">
  <header class="email-header">
    <img src="{{logoUrl}}" alt="Points of You AI Studio" />
    <h1>Welcome to Points of You AI Studio</h1>
  </header>
  
  <main class="email-content">
    <p>Hi {{firstName}},</p>
    
    <p>Thank you for joining Points of You AI Studio! To complete your registration and start your journey of meaningful reflection and growth, please verify your email address.</p>
    
    <div class="cta-button">
      <a href="{{verificationLink}}" class="verify-button">Verify Email Address</a>
    </div>
    
    <p class="alternative-text">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="{{verificationLink}}">{{verificationLink}}</a>
    </p>
    
    <p class="expiration-notice">
      This verification link will expire in {{expirationTime}}.
    </p>
    
    <p>If you didn't create an account with us, please ignore this email.</p>
  </main>
  
  <footer class="email-footer">
    <p>Need help? Contact us at <a href="mailto:{{supportEmail}}">{{supportEmail}}</a></p>
    <p>Points of You AI Studio Team</p>
  </footer>
</div>
```

##### Password Reset Email
```html
<div class="email-container">
  <header class="email-header">
    <img src="{{logoUrl}}" alt="Points of You AI Studio" />
    <h1>Password Reset Request</h1>
  </header>
  
  <main class="email-content">
    <p>Hi {{firstName}},</p>
    
    <p>We received a request to reset your password for your Points of You AI Studio account.</p>
    
    <div class="cta-button">
      <a href="{{resetLink}}" class="reset-button">Reset Password</a>
    </div>
    
    <p class="security-notice">
      For security reasons, this link will expire in {{expirationTime}}.
    </p>
    
    <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
  </main>
  
  <footer class="email-footer">
    <p>Need help? Contact us at <a href="mailto:{{supportEmail}}">{{supportEmail}}</a></p>
    <p>Points of You AI Studio Team</p>
  </footer>
</div>
```

### Email Service Configuration

```typescript
interface EmailService {
  provider: "sendgrid" | "ses" | "mailgun";
  
  templates: {
    registration_verification: {
      [language: string]: EmailTemplate;
    };
    password_reset: {
      [language: string]: EmailTemplate;
    };
    email_change: {
      [language: string]: EmailTemplate;
    };
    welcome_onboarding: {
      [language: string]: EmailTemplate;
    };
  };
  
  configuration: {
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
    trackingEnabled: boolean;
    deliveryOptimization: boolean;
  };
}
```

---

## Password Reset Flow

### Secure Password Reset Process

#### Step 1: Reset Request
```typescript
interface PasswordResetRequest {
  email: string;
  captcha?: string; // For bot protection
  
  validation: {
    emailExists: boolean;
    accountActive: boolean;
    recentResetAttempts: number; // Rate limiting
  };
}
```

#### Step 2: Token Generation and Email
```typescript
interface PasswordResetToken {
  token: string; // 256-bit cryptographically secure
  userId: string;
  email: string;
  expiresAt: Date; // 1 hour expiration
  used: boolean;
  ipAddress: string; // For security logging
  userAgent: string;
}
```

#### Step 3: Password Reset Form
```typescript
interface PasswordResetForm {
  token: string;
  newPassword: string;
  confirmPassword: string;
  
  validation: {
    tokenValid: boolean;
    tokenExpired: boolean;
    passwordStrength: {
      minLength: boolean; // 8 characters
      hasUppercase: boolean;
      hasLowercase: boolean;
      hasNumbers: boolean;
      hasSpecialChars: boolean;
      notCommon: boolean; // Check against common passwords
    };
    passwordsMatch: boolean;
  };
}
```

#### Step 4: Reset Completion
- Invalidate all existing sessions
- Send confirmation email
- Log security event
- Redirect to login with success message

### Security Features

#### Rate Limiting
```typescript
interface RateLimiting {
  passwordResetAttempts: {
    maxPerHour: 3;
    maxPerDay: 10;
    lockoutDuration: "1 hour";
  };
  
  loginAttempts: {
    maxConsecutive: 5;
    lockoutDuration: "15 minutes";
    progressiveLockout: boolean;
  };
}
```

#### Security Monitoring
```typescript
interface SecurityMonitoring {
  events: [
    "password_reset_requested",
    "password_reset_completed", 
    "suspicious_login_attempt",
    "account_locked",
    "email_verification_failed"
  ];
  
  alerting: {
    multipleFailedAttempts: boolean;
    unusualLocationLogin: boolean;
    passwordResetSpike: boolean;
  };
}
```

---

## Account Management Dashboard

### User Profile Management

#### Personal Information Section
```typescript
interface PersonalInfoSection {
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string; // With change verification
    phone?: string;
    timezone: string;
    language: "en" | "es" | "fr" | "de" | "he";
  };
  
  professionalInfo: {
    title?: string;
    organization?: string;
    bio?: string;
    website?: string;
    linkedIn?: string;
  };
  
  avatar: {
    current: string;
    uploadNew: boolean;
    generateAvatar: boolean;
  };
}
```

#### Account Security Section
```typescript
interface AccountSecuritySection {
  passwordManagement: {
    changePassword: boolean;
    passwordStrength: "weak" | "medium" | "strong";
    lastChanged: Date;
  };
  
  twoFactorAuth: {
    enabled: boolean;
    method: "sms" | "authenticator" | "email";
    backupCodes: string[];
  };
  
  activeSessions: {
    current: Session[];
    terminateAll: boolean;
    terminateSpecific: (sessionId: string) => void;
  };
  
  loginHistory: {
    recentLogins: LoginEvent[];
    suspiciousActivity: LoginEvent[];
  };
}
```

#### Preferences and Settings
```typescript
interface PreferencesSection {
  notifications: {
    email: {
      sessionReminders: boolean;
      weeklyDigest: boolean;
      productUpdates: boolean;
      securityAlerts: boolean;
    };
    push: {
      sessionStarting: boolean;
      aiCoachMessages: boolean;
      achievements: boolean;
    };
    sms: {
      criticalSecurityAlerts: boolean;
      sessionReminders: boolean;
    };
  };
  
  privacy: {
    profileVisibility: "private" | "organization" | "public";
    dataSharing: {
      analytics: boolean;
      aiImprovement: boolean;
      researchParticipation: boolean;
    };
    sessionRecording: {
      allowRecording: boolean;
      autoConsent: boolean;
    };
  };
  
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    screenReaderOptimized: boolean;
  };
}
```

### Role-Specific Dashboard Sections

#### Facilitator Dashboard
```typescript
interface FacilitatorDashboard {
  sessionManagement: {
    upcomingSessions: Session[];
    sessionTemplates: Template[];
    participantManagement: ParticipantGroup[];
  };
  
  analytics: {
    sessionMetrics: SessionAnalytics[];
    participantProgress: ParticipantProgress[];
    engagementTrends: EngagementData[];
  };
  
  contentLibrary: {
    personalContent: ContentItem[];
    sharedContent: ContentItem[];
    favoriteContent: ContentItem[];
  };
  
  aiCopilot: {
    recentInsights: AIInsight[];
    coachingRecommendations: Recommendation[];
    performanceMetrics: AIMetrics;
  };
}
```

#### Participant Dashboard
```typescript
interface ParticipantDashboard {
  personalJourney: {
    upcomingSessions: Session[];
    completedSessions: Session[];
    personalGoals: Goal[];
    achievements: Achievement[];
  };
  
  digitalJournal: {
    recentEntries: JournalEntry[];
    reflectionPrompts: Prompt[];
    insightsSummary: InsightSummary;
  };
  
  progressTracking: {
    skillDevelopment: SkillProgress[];
    engagementMetrics: EngagementMetrics;
    learningPath: LearningPath;
  };
  
  aiCoach: {
    recentConversations: Conversation[];
    personalizedRecommendations: Recommendation[];
    coachingInsights: CoachingInsight[];
  };
}
```

---

## Multi-Tenant Organization Management

### Organization Structure

#### Organization Hierarchy
```typescript
interface OrganizationStructure {
  organization: {
    id: string;
    name: string;
    domain: string;
    type: "corporate" | "educational" | "nonprofit" | "healthcare";
    settings: OrganizationSettings;
  };
  
  departments: Department[];
  teams: Team[];
  users: OrganizationUser[];
  
  billing: {
    subscription: Subscription;
    usage: UsageMetrics;
    billing_contact: ContactInfo;
  };
}
```

#### User Management
```typescript
interface OrganizationUserManagement {
  inviteUsers: {
    bulkInvite: (emails: string[], role: UserRole) => Promise<InvitationResult[]>;
    singleInvite: (email: string, role: UserRole, department?: string) => Promise<InvitationResult>;
    csvImport: (file: File) => Promise<ImportResult>;
  };
  
  userRoles: {
    assignRole: (userId: string, role: UserRole) => Promise<void>;
    createCustomRole: (roleDefinition: CustomRole) => Promise<Role>;
    managePermissions: (roleId: string, permissions: Permission[]) => Promise<void>;
  };
  
  userProvisioning: {
    ssoIntegration: {
      saml: SAMLConfig;
      oauth: OAuthConfig;
      ldap: LDAPConfig;
    };
    autoProvisioning: boolean;
    userDeprovisioning: boolean;
  };
}
```

#### Organization Settings
```typescript
interface OrganizationSettings {
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    customDomain?: string;
    emailDomain: string;
  };
  
  security: {
    passwordPolicy: PasswordPolicy;
    sessionTimeout: number;
    ipWhitelist?: string[];
    ssoRequired: boolean;
    mfaRequired: boolean;
  };
  
  features: {
    enabledFeatures: Feature[];
    customizations: Customization[];
    integrations: Integration[];
  };
  
  compliance: {
    dataRetention: RetentionPolicy;
    auditLogging: boolean;
    gdprCompliance: boolean;
    hipaaCompliance: boolean;
  };
}
```

### Organization Admin Interface

#### Admin Dashboard
```typescript
interface OrganizationAdminDashboard {
  overview: {
    totalUsers: number;
    activeUsers: number;
    sessionsThisMonth: number;
    usageMetrics: UsageMetrics;
  };
  
  userManagement: {
    userList: OrganizationUser[];
    pendingInvitations: Invitation[];
    userActivity: UserActivity[];
    roleDistribution: RoleDistribution;
  };
  
  analytics: {
    organizationMetrics: OrgAnalytics;
    departmentMetrics: DepartmentAnalytics[];
    engagementTrends: EngagementTrends;
    roiMetrics: ROIMetrics;
  };
  
  billing: {
    currentPlan: SubscriptionPlan;
    usageDetails: UsageDetails;
    billingHistory: BillingHistory[];
    upcomingCharges: Charge[];
  };
}
```

---

## Technical Implementation

### Backend Architecture (Django)

#### Models (Optimized for Django)
```python
# User Management Models - Leveraging Django's Built-in Features
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import EmailValidator
from django.utils import timezone
import uuid

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser
    Leverages Django's built-in authentication, password management, and security features
    """
    # Use Django's built-in fields where possible
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Override username to use email (Django best practice)
    username = None
    email = models.EmailField(
        'email address', 
        unique=True,
        validators=[EmailValidator()],
        error_messages={
            'unique': "A user with that email address already exists.",
        }
    )
    
    # Additional fields not in AbstractUser
    language = models.CharField(
        max_length=5, 
        choices=settings.LANGUAGES, 
        default=settings.LANGUAGE_CODE
    )
    timezone = models.CharField(
        max_length=50, 
        default=settings.TIME_ZONE,
        choices=[(tz, tz) for tz in pytz.common_timezones]
    )
    
    # Email verification (instead of is_active for more granular control)
    is_email_verified = models.BooleanField(default=False)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    
    # Use Django's built-in date fields
    # date_joined already exists in AbstractUser
    # last_login already exists in AbstractUser
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        db_table = 'auth_user'  # Use Django's standard table name
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['is_active', 'is_email_verified']),
        ]
    
    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
    
    def get_full_name(self):
        """Return the first_name plus the last_name, with a space in between."""
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()
    
    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES)
    access_tier = models.CharField(max_length=20, choices=ACCESS_TIER_CHOICES)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    organization = models.ForeignKey('Organization', on_delete=models.SET_NULL, null=True, blank=True)
    onboarding_completed = models.BooleanField(default=False)
    onboarding_step = models.IntegerField(default=0)

class Organization(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True)
    organization_type = models.CharField(max_length=20, choices=ORG_TYPE_CHOICES)
    settings = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

# Session and Participant Relationship Models
class Session(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=255)
    facilitator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='facilitated_sessions')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, blank=True)
    protocol_data = models.JSONField(default=dict)  # Journey structure
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    meeting_provider = models.CharField(max_length=50, blank=True)
    meeting_data = models.JSONField(default=dict)
    scheduled_time = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    max_participants = models.IntegerField(default=50)
    is_public = models.BooleanField(default=False)  # Whether participants can self-register
    requires_approval = models.BooleanField(default=False)  # Whether facilitator must approve participants
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['facilitator', 'status']),
            models.Index(fields=['organization', 'scheduled_time']),
        ]

class SessionParticipant(models.Model):
    STATUS_CHOICES = [
        ('invited', 'Invited'),
        ('registered', 'Registered'),
        ('approved', 'Approved'),
        ('joined', 'Joined'),
        ('completed', 'Completed'),
        ('no_show', 'No Show'),
        ('removed', 'Removed')
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='participants')
    participant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='session_participations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='invited')
    
    # Session-specific participant data
    invited_at = models.DateTimeField(auto_now_add=True)
    registered_at = models.DateTimeField(null=True, blank=True)
    joined_at = models.DateTimeField(null=True, blank=True)
    left_at = models.DateTimeField(null=True, blank=True)
    
    # Participant's session data (accessible by facilitator)
    card_selections = models.JSONField(default=list)  # List of selected cards with timestamps
    reflections = models.JSONField(default=list)  # List of reflection entries
    engagement_metrics = models.JSONField(default=dict)  # Engagement data for facilitator
    breakout_room_assignments = models.JSONField(default=list)  # History of breakout room assignments
    
    # Privacy settings
    share_reflections_with_facilitator = models.BooleanField(default=True)
    share_engagement_data = models.BooleanField(default=True)
    allow_recording_participation = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['session', 'participant']
        indexes = [
            models.Index(fields=['participant', 'status']),
            models.Index(fields=['session', 'status']),
        ]

# Participant-Facilitator relationship tracking
class ParticipantFacilitatorRelationship(models.Model):
    """
    Tracks the ongoing relationship between participants and facilitators
    across multiple sessions for better personalization and continuity
    """
    participant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='facilitator_relationships')
    facilitator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='participant_relationships')
    
    # Relationship metadata
    first_session_date = models.DateTimeField()
    last_session_date = models.DateTimeField()
    total_sessions = models.IntegerField(default=0)
    
    # Facilitator notes about this participant (private to facilitator)
    facilitator_notes = models.TextField(blank=True)
    participant_goals = models.JSONField(default=list)  # Goals set in collaboration
    progress_tracking = models.JSONField(default=dict)  # Progress metrics
    
    # Relationship settings
    is_active = models.BooleanField(default=True)
    participant_consent_to_tracking = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['participant', 'facilitator']
        indexes = [
            models.Index(fields=['facilitator', 'is_active']),
            models.Index(fields=['participant', 'is_active']),
        ]

class EmailVerificationToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    purpose = models.CharField(max_length=20, choices=TOKEN_PURPOSE_CHOICES)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class PasswordResetToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
```

#### Views and API Endpoints
```python
# Authentication Views - Leveraging Django's Built-in Features
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView

class UserRegistrationView(CreateAPIView):
    """
    User registration using Django's built-in user creation with DRF
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        # Use Django's built-in user creation
        user = serializer.save()
        
        # Django automatically hashes password if using set_password()
        # This is handled in the serializer
        
        # Generate email verification using Django's built-in token generator
        token = default_token_generator.make_token(user)
        
        # Send verification email using Django's built-in email system
        send_verification_email.delay(user.id, token)
        
        return user

class EmailVerificationView(APIView):
    """
    Email verification using Django's built-in token system
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        token = request.data.get('token')
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                'error': 'Invalid user'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Use Django's built-in token verification
        if default_token_generator.check_token(user, token):
            user.is_email_verified = True
            user.email_verified_at = timezone.now()
            user.is_active = True  # Activate user account
            user.save(update_fields=['is_email_verified', 'email_verified_at', 'is_active'])
            
            return Response({
                'message': 'Email verified successfully',
                'redirect_url': '/onboarding/role-selection'
            })
        else:
            return Response({
                'error': 'Invalid or expired verification token'
            }, status=status.HTTP_400_BAD_REQUEST)

class CustomPasswordResetView(PasswordResetView):
    """
    Password reset using Django's built-in PasswordResetView
    Extended for API and custom email templates
    """
    form_class = PasswordResetForm
    template_name = None  # API only, no template
    
    def form_valid(self, form):
        # Django handles token generation and email sending
        opts = {
            'use_https': self.request.is_secure(),
            'token_generator': default_token_generator,
            'from_email': settings.DEFAULT_FROM_EMAIL,
            'email_template_name': 'registration/password_reset_email.html',
            'subject_template_name': 'registration/password_reset_subject.txt',
            'request': self.request,
            'html_email_template_name': 'registration/password_reset_email.html',
        }
        form.save(**opts)
        
        return Response({
            'message': 'Password reset email sent successfully'
        })

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    JWT authentication using django-rest-framework-simplejwt
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            # Get user info for response
            email = request.data.get('email')
            try:
                user = User.objects.get(email=email)
                response.data.update({
                    'user': {
                        'id': str(user.id),
                        'email': user.email,
                        'name': user.get_full_name(),
                        'role': user.profile.role if hasattr(user, 'profile') else None,
                        'is_email_verified': user.is_email_verified
                    }
                })
            except User.DoesNotExist:
                pass
        
        return response

# Use Django's built-in Class-Based Views for common operations
class UserProfileUpdateView(UpdateAPIView):
    """
    Update user profile using Django's built-in UpdateAPIView
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ChangePasswordView(UpdateAPIView):
    """
    Change password using Django's built-in password validation
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Use Django's built-in password validation
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            
            if not user.check_password(old_password):
                return Response({
                    'error': 'Invalid old password'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Django's built-in password validation and hashing
            try:
                validate_password(new_password, user)
                user.set_password(new_password)
                user.save()
                
                # Update session auth hash to prevent logout
                update_session_auth_hash(request, user)
                
                return Response({
                    'message': 'Password changed successfully'
                })
            except ValidationError as e:
                return Response({
                    'error': list(e.messages)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Session Management Views
class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.profile.role == 'facilitator':
            # Facilitators see their own sessions
            return Session.objects.filter(facilitator=user)
        elif user.profile.role == 'participant':
            # Participants see sessions they're involved in
            return Session.objects.filter(
                participants__participant=user
            ).distinct()
        elif user.profile.role == 'organization_admin':
            # Org admins see all sessions in their organization
            return Session.objects.filter(organization=user.profile.organization)
        else:
            return Session.objects.none()
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def participant_details(self, request, pk=None):
        """
        Facilitator endpoint to get detailed participant information for their session
        """
        session = self.get_object()
        
        # Only facilitators can access participant details
        if request.user != session.facilitator:
            return Response({
                'error': 'Only the session facilitator can access participant details'
            }, status=status.HTTP_403_FORBIDDEN)
        
        participants = SessionParticipant.objects.filter(
            session=session
        ).select_related('participant', 'participant__profile')
        
        participant_data = []
        for sp in participants:
            # Get historical relationship data
            try:
                relationship = ParticipantFacilitatorRelationship.objects.get(
                    participant=sp.participant,
                    facilitator=session.facilitator
                )
            except ParticipantFacilitatorRelationship.DoesNotExist:
                relationship = None
            
            data = {
                'participant_id': sp.participant.id,
                'name': f"{sp.participant.first_name} {sp.participant.last_name}",
                'email': sp.participant.email,
                'avatar': sp.participant.profile.avatar.url if sp.participant.profile.avatar else None,
                'status': sp.status,
                'joined_at': sp.joined_at,
                'card_selections': sp.card_selections if sp.share_reflections_with_facilitator else [],
                'reflections': sp.reflections if sp.share_reflections_with_facilitator else [],
                'engagement_metrics': sp.engagement_metrics if sp.share_engagement_data else {},
                'breakout_room_assignments': sp.breakout_room_assignments,
                'privacy_settings': {
                    'share_reflections': sp.share_reflections_with_facilitator,
                    'share_engagement': sp.share_engagement_data,
                    'allow_recording': sp.allow_recording_participation
                },
                'relationship_history': {
                    'total_sessions': relationship.total_sessions if relationship else 0,
                    'first_session': relationship.first_session_date if relationship else None,
                    'facilitator_notes': relationship.facilitator_notes if relationship else '',
                    'participant_goals': relationship.participant_goals if relationship else []
                } if relationship else None
            }
            participant_data.append(data)
        
        return Response({
            'session_id': session.id,
            'session_title': session.title,
            'participants': participant_data
        })
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_participant(self, request, pk=None):
        """
        Add a participant to a session
        """
        session = self.get_object()
        
        # Only facilitators can add participants to their sessions
        if request.user != session.facilitator:
            return Response({
                'error': 'Only the session facilitator can add participants'
            }, status=status.HTTP_403_FORBIDDEN)
        
        participant_email = request.data.get('participant_email')
        if not participant_email:
            return Response({
                'error': 'participant_email is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            participant = User.objects.get(email=participant_email)
        except User.DoesNotExist:
            return Response({
                'error': 'User with this email does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Check if participant is already in the session
        if SessionParticipant.objects.filter(session=session, participant=participant).exists():
            return Response({
                'error': 'Participant is already in this session'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create session participant
        session_participant = SessionParticipant.objects.create(
            session=session,
            participant=participant,
            status='invited'
        )
        
        # Create or update participant-facilitator relationship
        relationship, created = ParticipantFacilitatorRelationship.objects.get_or_create(
            participant=participant,
            facilitator=session.facilitator,
            defaults={
                'first_session_date': session.scheduled_time,
                'last_session_date': session.scheduled_time,
                'total_sessions': 1
            }
        )
        
        if not created:
            relationship.last_session_date = session.scheduled_time
            relationship.total_sessions += 1
            relationship.save()
        
        # Send invitation email
        send_session_invitation_email.delay(
            participant.id, 
            session.id, 
            session.facilitator.id
        )
        
        return Response({
            'message': 'Participant added successfully',
            'participant_id': participant.id,
            'session_participant_id': session_participant.id
        })

class ParticipantSessionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Participant view of their sessions
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return SessionParticipant.objects.filter(
            participant=self.request.user
        ).select_related('session', 'session__facilitator')
    
    @action(detail=True, methods=['post'])
    def join_session(self, request, pk=None):
        """
        Participant joins a session
        """
        session_participant = self.get_object()
        
        if session_participant.status not in ['invited', 'registered', 'approved']:
            return Response({
                'error': 'Cannot join this session with current status'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        session_participant.status = 'joined'
        session_participant.joined_at = timezone.now()
        session_participant.save()
        
        return Response({
            'message': 'Successfully joined session',
            'session_id': session_participant.session.id,
            'meeting_url': session_participant.session.meeting_data.get('active_url')
        })
    
    @action(detail=True, methods=['post'])
    def update_privacy_settings(self, request, pk=None):
        """
        Participant updates their privacy settings for a session
        """
        session_participant = self.get_object()
        
        privacy_settings = request.data.get('privacy_settings', {})
        
        if 'share_reflections' in privacy_settings:
            session_participant.share_reflections_with_facilitator = privacy_settings['share_reflections']
        
        if 'share_engagement' in privacy_settings:
            session_participant.share_engagement_data = privacy_settings['share_engagement']
        
        if 'allow_recording' in privacy_settings:
            session_participant.allow_recording_participation = privacy_settings['allow_recording']
        
        session_participant.save()
        
        return Response({
            'message': 'Privacy settings updated successfully',
            'privacy_settings': {
                'share_reflections': session_participant.share_reflections_with_facilitator,
                'share_engagement': session_participant.share_engagement_data,
                'allow_recording': session_participant.allow_recording_participation
            }
        })

class FacilitatorParticipantRelationshipViewSet(viewsets.ModelViewSet):
    """
    Manage participant-facilitator relationships
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.profile.role == 'facilitator':
            return ParticipantFacilitatorRelationship.objects.filter(
                facilitator=self.request.user,
                is_active=True
            ).select_related('participant', 'participant__profile')
        else:
            return ParticipantFacilitatorRelationship.objects.none()
    
    @action(detail=True, methods=['post'])
    def update_notes(self, request, pk=None):
        """
        Facilitator updates notes about a participant
        """
        relationship = self.get_object()
        
        notes = request.data.get('notes', '')
        relationship.facilitator_notes = notes
        relationship.save()
        
        return Response({
            'message': 'Notes updated successfully'
        })
    
    @action(detail=True, methods=['post'])
    def update_goals(self, request, pk=None):
        """
        Update participant goals (collaborative between facilitator and participant)
        """
        relationship = self.get_object()
        
        goals = request.data.get('goals', [])
        relationship.participant_goals = goals
        relationship.save()
        
        return Response({
            'message': 'Goals updated successfully',
            'goals': goals
        })
```

class EmailVerificationView(APIView):
    def post(self, request):
        token = request.data.get('token')
        
        try:
            verification_token = EmailVerificationToken.objects.get(
                token=token,
                used=False,
                expires_at__gt=timezone.now()
            )
            
            user = verification_token.user
            user.is_email_verified = True
            user.email_verified_at = timezone.now()
            user.save()
            
            verification_token.used = True
            verification_token.save()
            
            return Response({
                'message': 'Email verified successfully',
                'redirect_url': '/onboarding/role-selection'
            })
            
        except EmailVerificationToken.DoesNotExist:
            return Response({
                'error': 'Invalid or expired verification token'
            }, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        
        # Rate limiting check
        if self.check_rate_limit(email, request.META.get('REMOTE_ADDR')):
            return Response({
                'error': 'Too many reset attempts. Please try again later.'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        try:
            user = User.objects.get(email=email, is_active=True)
            
            # Invalidate existing tokens
            PasswordResetToken.objects.filter(
                user=user, used=False
            ).update(used=True)
            
            # Create new token
            token = PasswordResetToken.objects.create(
                user=user,
                token=generate_secure_token(),
                expires_at=timezone.now() + timedelta(hours=1),
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            
            # Send reset email
            send_password_reset_email.delay(user.id, token.token)
            
        except User.DoesNotExist:
            # Don't reveal if email exists
            pass
        
        return Response({
            'message': 'If an account with this email exists, you will receive a password reset link.'
        })

class OnboardingStepView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        step_data = request.data
        
        # Process onboarding step based on user role
        onboarding_service = OnboardingService(user)
        result = onboarding_service.process_step(step_data)
        
        return Response(result)
```

#### Django Packages and Services (Avoiding Duplication)
```python
# settings.py - Django Configuration
INSTALLED_APPS = [
    # Django Core Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    
    # Third-party Django packages (avoid custom implementations)
    'rest_framework',
    'rest_framework_simplejwt',
    'django_extensions',
    'django_filters',
    'corsheaders',
    'channels',
    'channels_redis',
    
    # Authentication and User Management
    'allauth',  # Social authentication instead of custom OAuth
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.microsoft',
    
    # Multi-tenancy (instead of custom implementation)
    'django_tenants',  # or 'tenant_schemas'
    
    # Admin and Management
    'django.contrib.admin',
    'admin_interface',  # Enhanced admin interface
    'colorfield',  # For color picker in admin
    
    # Security and Compliance
    'axes',  # Account lockout for security
    'django_otp',  # Two-factor authentication
    'django_ratelimit',  # Rate limiting
    
    # Email and Notifications
    'django_ses',  # AWS SES integration
    'anymail',  # Email service abstraction
    
    # API Documentation
    'drf_spectacular',  # OpenAPI 3.0 schema generation
    
    # Custom apps
    'accounts',
    'sessions',
    'organizations',
]

# Authentication Configuration - Use Django's Built-in Features
AUTH_USER_MODEL = 'accounts.User'
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',  # Social auth
    'axes.backends.AxesBackend',  # Security lockout
]

# Password Validation - Django Built-in
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Session Configuration - Django Built-in
SESSION_COOKIE_SECURE = True  # HTTPS only
SESSION_COOKIE_HTTPONLY = True  # Prevent XSS
SESSION_COOKIE_SAMESITE = 'Lax'  # CSRF protection
SESSION_COOKIE_AGE = 3600  # 1 hour

# Security - Django Built-in
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Email Configuration - Using Django's Email Framework
EMAIL_BACKEND = 'anymail.backends.amazon_ses.EmailBackend'  # or 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'noreply@pointsofyou.ai'
SERVER_EMAIL = 'server@pointsofyou.ai'

# Internationalization - Django Built-in
LANGUAGE_CODE = 'en-us'
LANGUAGES = [
    ('en', 'English'),
    ('es', 'Español'),
    ('fr', 'Français'),
    ('de', 'Deutsch'),
    ('he', 'עברית'),
]
LOCALE_PATHS = [
    BASE_DIR / 'locale',
]
USE_I18N = True
USE_L10N = True
USE_TZ = True

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# JWT Configuration
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

#### Services (Using Django Ecosystem)
```python
# services.py - Leveraging Django's Built-in Services
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
from celery import shared_task

class EmailService:
    """
    Email service using Django's built-in email framework
    Avoids custom SMTP implementations
    """
    
    @staticmethod
    def send_verification_email(user_id: str, token: str):
        """
        Send verification email using Django's email system
        """
        from accounts.models import User
        
        user = User.objects.get(id=user_id)
        
        # Use Django's template system
        context = {
            'user': user,
            'verification_url': f"{settings.FRONTEND_URL}/verify-email?token={token}&user_id={user_id}",
            'site_name': 'Points of You AI Studio',
        }
        
        # Use Django's template rendering
        subject = render_to_string('emails/verification_subject.txt', context).strip()
        text_content = render_to_string('emails/verification_email.txt', context)
        html_content = render_to_string('emails/verification_email.html', context)
        
        # Use Django's EmailMultiAlternatives
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

@shared_task
def send_verification_email(user_id: str, token: str):
    """
    Celery task using Django's email system
    """
    EmailService.send_verification_email(user_id, token)

class UserManagementService:
    """
    User management using Django's built-in User model and managers
    """
    
    @staticmethod
    def create_user(email, password, **extra_fields):
        """
        Create user using Django's built-in create_user method
        """
        from accounts.models import User
        return User.objects.create_user(email=email, password=password, **extra_fields)
    
    @staticmethod
    def authenticate_user(email, password):
        """
        Authenticate user using Django's built-in authentication
        """
        from django.contrib.auth import authenticate
        return authenticate(email=email, password=password)
    
    @staticmethod
    def generate_verification_token(user):
        """
        Generate token using Django's built-in token generator
        """
        return default_token_generator.make_token(user)
    
    @staticmethod
    def verify_token(user, token):
        """
        Verify token using Django's built-in token verification
        """
        return default_token_generator.check_token(user, token)

class OrganizationService:
    """
    Organization management leveraging Django's built-in features
    """
    
    @staticmethod
    def create_organization(name, domain, admin_user):
        """
        Create organization with proper Django model relationships
        """
        from accounts.models import Organization
        
        org = Organization.objects.create(
            name=name,
            domain=domain,
            settings={}
        )
        
        # Use Django's built-in group system for organization roles
        from django.contrib.auth.models import Group, Permission
        admin_group, created = Group.objects.get_or_create(
            name=f"{org.name}_admins"
        )
        
        admin_user.groups.add(admin_group)
        admin_user.profile.organization = org
        admin_user.profile.save()
        
        return org

class PermissionService:
    """
    Permission management using Django's built-in permission system
    """
    
    @staticmethod
    def assign_role_permissions(user, role):
        """
        Assign permissions using Django's built-in permission system
        """
        from django.contrib.auth.models import Group, Permission
        
        # Use Django's built-in groups and permissions
        role_groups = {
            'facilitator': 'facilitators',
            'participant': 'participants',
            'organization_admin': 'organization_admins',
            'educator': 'educators'
        }
        
        group_name = role_groups.get(role)
        if group_name:
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.clear()  # Remove existing groups
            user.groups.add(group)
    
    @staticmethod
    def has_permission(user, permission_codename):
        """
        Check permission using Django's built-in permission system
        """
        return user.has_perm(permission_codename)

class SecurityService:
    """
    Security service using Django's built-in security features
    """
    
    @staticmethod
    def check_password_strength(password, user=None):
        """
        Validate password using Django's built-in password validators
        """
        from django.contrib.auth.password_validation import validate_password
        from django.core.exceptions import ValidationError
        
        try:
            validate_password(password, user)
            return True, []
        except ValidationError as e:
            return False, e.messages
    
    @staticmethod
    def log_security_event(user, event_type, ip_address, user_agent):
        """
        Log security events using Django's logging framework
        """
        import logging
        
        security_logger = logging.getLogger('security')
        security_logger.info(
            f"Security event: {event_type} for user {user.email} from {ip_address}",
            extra={
                'user_id': user.id,
                'event_type': event_type,
                'ip_address': ip_address,
                'user_agent': user_agent
            }
        )

class EmailService:
    def __init__(self):
        self.provider = settings.EMAIL_PROVIDER
        self.templates = self.load_templates()
    
    def send_verification_email(self, user_id: str, token: str):
        user = User.objects.get(id=user_id)
        
        template = self.templates['registration_verification'][user.language]
        
        context = {
            'firstName': user.first_name,
            'verificationLink': f"{settings.FRONTEND_URL}/verify-email?token={token}",
            'expirationTime': '24 hours',
            'supportEmail': settings.SUPPORT_EMAIL,
            'logoUrl': f"{settings.STATIC_URL}images/logo.png"
        }
        
        self.send_email(
            to=user.email,
            subject=template['subject'],
            template=template['html'],
            context=context
        )
    
    def send_password_reset_email(self, user_id: str, token: str):
        user = User.objects.get(id=user_id)
        
        template = self.templates['password_reset'][user.language]
        
        context = {
            'firstName': user.first_name,
            'resetLink': f"{settings.FRONTEND_URL}/reset-password?token={token}",
            'expirationTime': '1 hour',
            'supportEmail': settings.SUPPORT_EMAIL,
            'logoUrl': f"{settings.STATIC_URL}images/logo.png"
        }
        
        self.send_email(
            to=user.email,
            subject=template['subject'],
            template=template['html'],
            context=context
        )

class OnboardingService:
    def __init__(self, user: User):
        self.user = user
        self.profile = user.profile
    
    def process_step(self, step_data: dict):
        if self.profile.role == 'facilitator':
            return self.process_facilitator_step(step_data)
        elif self.profile.role == 'participant':
            return self.process_participant_step(step_data)
        elif self.profile.role == 'organization_admin':
            return self.process_admin_step(step_data)
    
    def process_facilitator_step(self, step_data: dict):
        step = self.profile.onboarding_step
        
        if step == 1:  # Professional info
            self.save_professional_info(step_data)
        elif step == 2:  # Session preferences
            self.save_session_preferences(step_data)
        elif step == 3:  # Tool preferences
            self.save_tool_preferences(step_data)
        elif step == 4:  # First session setup
            self.setup_first_session(step_data)
            self.profile.onboarding_completed = True
        
        self.profile.onboarding_step += 1
        self.profile.save()
        
        return {
            'step': self.profile.onboarding_step,
            'completed': self.profile.onboarding_completed,
            'next_step_url': self.get_next_step_url()
        }
```

### Frontend Implementation (React/TypeScript)

#### Registration Component
```typescript
// components/auth/Registration.tsx
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: string;
  timezone: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export const Registration: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [form, setForm] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    acceptTerms: false,
    acceptMarketing: false
  });
  
  const [errors, setErrors] = useState<Partial<RegistrationForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationForm> = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = t('validation.required');
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = t('validation.required');
    }
    
    if (!form.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    
    if (!form.password) {
      newErrors.password = t('validation.required');
    } else if (form.password.length < 8) {
      newErrors.password = t('validation.passwordTooShort');
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDoNotMatch');
    }
    
    if (!form.acceptTerms) {
      newErrors.acceptTerms = t('validation.mustAcceptTerms');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register({
        personalInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        },
        preferences: {
          language: form.language,
          timezone: form.timezone,
          communicationPreferences: {
            email: true,
            sms: false,
            push: true
          }
        },
        marketing: {
          acceptMarketing: form.acceptMarketing
        }
      });
      
      // Redirect to email verification page
      window.location.href = '/verify-email';
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>{t('auth.registration.title')}</h1>
        <p>{t('auth.registration.subtitle')}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName">{t('auth.registration.firstName')}</label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-field">
            <label htmlFor="lastName">{t('auth.registration.lastName')}</label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="email">{t('auth.registration.email')}</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-field">
          <label htmlFor="password">{t('auth.registration.password')}</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="form-field">
          <label htmlFor="confirmPassword">{t('auth.registration.confirmPassword')}</label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        
        <div className="preferences-section">
          <div className="form-field">
            <label htmlFor="language">{t('auth.registration.language')}</label>
            <select
              id="language"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="he">עברית</option>
            </select>
          </div>
        </div>
        
        <div className="checkbox-section">
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })}
            />
            <span>
              {t('auth.registration.acceptTerms')} 
              <a href="/terms" target="_blank">{t('auth.registration.termsLink')}</a>
              {t('auth.registration.and')}
              <a href="/privacy" target="_blank">{t('auth.registration.privacyLink')}</a>
            </span>
          </label>
          {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
          
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={form.acceptMarketing}
              onChange={(e) => setForm({ ...form, acceptMarketing: e.target.checked })}
            />
            <span>{t('auth.registration.acceptMarketing')}</span>
          </label>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? t('common.loading') : t('auth.registration.submit')}
        </button>
      </form>
      
      <div className="login-link">
        <p>
          {t('auth.registration.alreadyHaveAccount')} 
          <a href="/login">{t('auth.registration.loginLink')}</a>
        </p>
      </div>
    </div>
  );
};
```

#### Email Verification Component
```typescript
// components/auth/EmailVerification.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';

export const EmailVerification: React.FC = () => {
  const { t } = useTranslation();
  const { verifyEmail, resendVerification } = useAuth();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'pending'>('pending');
  const [error, setError] = useState<string>('');
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerification(token);
    } else {
      setStatus('pending');
    }
  }, [token]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  const handleVerification = async (verificationToken: string) => {
    setStatus('verifying');
    
    try {
      const result = await verifyEmail(verificationToken);
      setStatus('success');
      
      // Redirect to onboarding after 2 seconds
      setTimeout(() => {
        window.location.href = result.redirect_url || '/onboarding/role-selection';
      }, 2000);
      
    } catch (error: any) {
      setStatus('error');
      setError(error.message || t('auth.verification.genericError'));
    }
  };

  const handleResendVerification = async () => {
    if (!canResend) return;
    
    try {
      await resendVerification();
      setCanResend(false);
      setResendCooldown(60); // 60 second cooldown
      
      // Show success message
      setStatus('pending');
      
    } catch (error: any) {
      setError(error.message || t('auth.verification.resendError'));
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="verification-status verifying">
            <div className="spinner" />
            <h2>{t('auth.verification.verifying')}</h2>
            <p>{t('auth.verification.verifyingMessage')}</p>
          </div>
        );
        
      case 'success':
        return (
          <div className="verification-status success">
            <div className="success-icon">✓</div>
            <h2>{t('auth.verification.success')}</h2>
            <p>{t('auth.verification.successMessage')}</p>
            <p className="redirect-message">{t('auth.verification.redirecting')}</p>
          </div>
        );
        
      case 'error':
        return (
          <div className="verification-status error">
            <div className="error-icon">✗</div>
            <h2>{t('auth.verification.error')}</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button 
                onClick={handleResendVerification}
                disabled={!canResend}
                className="resend-button"
              >
                {canResend 
                  ? t('auth.verification.resendEmail')
                  : t('auth.verification.resendCooldown', { seconds: resendCooldown })
                }
              </button>
              <a href="/support" className="support-link">
                {t('auth.verification.contactSupport')}
              </a>
            </div>
          </div>
        );
        
      case 'pending':
      default:
        return (
          <div className="verification-status pending">
            <div className="email-icon">📧</div>
            <h2>{t('auth.verification.checkEmail')}</h2>
            <p>{t('auth.verification.checkEmailMessage')}</p>
            <div className="verification-actions">
              <button 
                onClick={handleResendVerification}
                disabled={!canResend}
                className="resend-button"
              >
                {canResend 
                  ? t('auth.verification.resendEmail')
                  : t('auth.verification.resendCooldown', { seconds: resendCooldown })
                }
              </button>
            </div>
            <div className="help-text">
              <p>{t('auth.verification.helpText')}</p>
              <a href="/support">{t('auth.verification.contactSupport')}</a>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="email-verification-container">
      <div className="verification-card">
        {renderContent()}
      </div>
    </div>
  );
};
```

---

## Security and Privacy

### Security Measures

#### Password Security
```typescript
interface PasswordSecurity {
  requirements: {
    minLength: 8;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    preventCommonPasswords: boolean;
    preventUserInfoInPassword: boolean;
  };
  
  hashing: {
    algorithm: "bcrypt" | "argon2";
    rounds: 12; // For bcrypt
    memory: 65536; // For argon2 (64MB)
    iterations: 3; // For argon2
    parallelism: 4; // For argon2
  };
  
  policies: {
    passwordExpiration: false; // Not recommended by NIST
    preventPasswordReuse: 5; // Last 5 passwords
    accountLockout: {
      maxAttempts: 5;
      lockoutDuration: "15 minutes";
      progressiveLockout: boolean;
    };
  };
}
```

#### Session Security
```typescript
interface SessionSecurity {
  jwtConfiguration: {
    algorithm: "RS256";
    accessTokenExpiry: "15 minutes";
    refreshTokenExpiry: "7 days";
    issuer: string;
    audience: string;
  };
  
  sessionManagement: {
    secureCookies: boolean;
    httpOnlyCookies: boolean;
    sameSitePolicy: "Strict" | "Lax";
    sessionTimeout: "30 minutes";
    concurrentSessionLimit: 5;
  };
  
  securityHeaders: {
    contentSecurityPolicy: string;
    strictTransportSecurity: string;
    xFrameOptions: "DENY";
    xContentTypeOptions: "nosniff";
    referrerPolicy: "strict-origin-when-cross-origin";
  };
}
```

### Privacy Compliance

#### Participant-Facilitator Data Access Control
```typescript
interface ParticipantDataAccess {
  sessionData: {
    // Data facilitators can access during and after sessions
    facilitatorAccess: {
      participantBasicInfo: {
        name: boolean; // Always accessible
        email: boolean; // Always accessible (for communication)
        avatar: boolean; // Always accessible
        sessionStatus: boolean; // Always accessible
      };
      
      participantSessionData: {
        cardSelections: "with_consent"; // Controlled by participant setting
        reflections: "with_consent"; // Controlled by participant setting
        engagementMetrics: "with_consent"; // Controlled by participant setting
        breakoutRoomActivity: boolean; // Always accessible for session management
        attendanceData: boolean; // Always accessible
      };
      
      crossSessionData: {
        sessionHistory: boolean; // Only sessions with this facilitator
        progressTracking: "collaborative"; // Set jointly by facilitator and participant
        facilitatorNotes: "facilitator_private"; // Private to facilitator
        participantGoals: "collaborative"; // Visible to both parties
      };
    };
    
    participantControl: {
      privacySettings: {
        shareReflectionsWithFacilitator: boolean; // Default: true
        shareEngagementData: boolean; // Default: true
        allowRecordingParticipation: boolean; // Default: true
      };
      
      dataPortability: {
        exportOwnData: boolean; // Participant can export their own data
        requestDataDeletion: boolean; // Right to be forgotten
        viewFacilitatorNotes: boolean; // Can request to see facilitator's notes about them
      };
    };
  };
  
  crossFacilitatorData: {
    // Participants can work with multiple facilitators
    dataIsolation: {
      facilitatorSpecificData: boolean; // Each facilitator only sees their relationship data
      crossFacilitatorInsights: "aggregated_only"; // Only aggregated, anonymized insights
      participantConsent: "required_for_sharing"; // Explicit consent needed to share between facilitators
    };
  };
}
```

#### GDPR Compliance
```typescript
interface GDPRCompliance {
  dataProcessing: {
    legalBasis: "consent" | "contract" | "legitimate_interest";
    purposeLimitation: boolean;
    dataMinimization: boolean;
    accuracyMaintenance: boolean;
    storageLimitation: boolean;
  };
  
  userRights: {
    rightOfAccess: boolean; // Export user data
    rightToRectification: boolean; // Update incorrect data
    rightToErasure: boolean; // Delete user account and data
    rightToPortability: boolean; // Export data in machine-readable format
    rightToObject: boolean; // Opt-out of processing
    rightToRestrict: boolean; // Limit processing
  };
  
  participantSpecificRights: {
    viewFacilitatorNotes: boolean; // Right to see what facilitators wrote about them
    controlDataSharing: boolean; // Control what data is shared with facilitators
    crossFacilitatorDataControl: boolean; // Control data sharing between different facilitators
    sessionDataRetention: boolean; // Control how long session data is retained
  };
  
  facilitatorObligations: {
    dataMinimization: boolean; // Only collect necessary participant data
    purposeLimitation: boolean; // Use participant data only for session purposes
    transparentProcessing: boolean; // Clear about what data is collected and why
    participantConsent: boolean; // Obtain consent for data processing
    dataSecurityMeasures: boolean; // Implement appropriate security measures
  };
  
  consentManagement: {
    explicitConsent: boolean;
    granularConsent: boolean;
    withdrawalMechanism: boolean;
    consentRecords: boolean;
    sessionSpecificConsent: boolean; // Consent can be different for each session
  };
  
  dataProtection: {
    encryptionAtRest: boolean;
    encryptionInTransit: boolean;
    accessControls: boolean;
    auditLogging: boolean;
    dataBreachNotification: "72 hours";
    participantDataIsolation: boolean; // Ensure data isolation between different facilitators
  };
}
```

#### Data Retention Policies
```typescript
interface DataRetentionPolicies {
  userAccounts: {
    activeAccountData: "indefinite"; // While account is active
    inactiveAccountData: "3 years"; // After last login
    deletedAccountData: "30 days"; // Grace period for recovery
  };
  
  sessionData: {
    sessionLogs: "1 year";
    analyticsData: "2 years";
    performanceMetrics: "6 months";
  };
  
  communicationData: {
    emailLogs: "2 years";
    chatHistory: "1 year";
    supportTickets: "5 years";
  };
  
  auditLogs: {
    securityEvents: "7 years";
    accessLogs: "1 year";
    systemLogs: "90 days";
  };
}
```

---

## Multilingual Support

### Language Configuration

#### Supported Languages
```typescript
interface SupportedLanguages {
  "en": {
    name: "English";
    nativeName: "English";
    direction: "ltr";
    locale: "en-US";
    flag: "🇺🇸";
  };
  "es": {
    name: "Spanish";
    nativeName: "Español";
    direction: "ltr";
    locale: "es-ES";
    flag: "🇪🇸";
  };
  "fr": {
    name: "French";
    nativeName: "Français";
    direction: "ltr";
    locale: "fr-FR";
    flag: "🇫🇷";
  };
  "de": {
    name: "German";
    nativeName: "Deutsch";
    direction: "ltr";
    locale: "de-DE";
    flag: "🇩🇪";
  };
  "he": {
    name: "Hebrew";
    nativeName: "עברית";
    direction: "rtl";
    locale: "he-IL";
    flag: "🇮🇱";
  };
}
```

#### Translation Keys for Onboarding
```json
{
  "auth": {
    "registration": {
      "title": "Join Points of You AI Studio",
      "subtitle": "Start your journey of meaningful reflection and growth",
      "firstName": "First Name",
      "lastName": "Last Name",
      "email": "Email Address",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "language": "Preferred Language",
      "acceptTerms": "I agree to the Terms of Service and Privacy Policy",
      "acceptMarketing": "I would like to receive updates and insights via email",
      "submit": "Create Account",
      "alreadyHaveAccount": "Already have an account?",
      "loginLink": "Sign in here"
    },
    "verification": {
      "title": "Verify Your Email",
      "checkEmail": "Check Your Email",
      "checkEmailMessage": "We've sent a verification link to your email address. Click the link to activate your account.",
      "verifying": "Verifying...",
      "verifyingMessage": "Please wait while we verify your email address.",
      "success": "Email Verified!",
      "successMessage": "Your email has been successfully verified. Welcome to Points of You AI Studio!",
      "error": "Verification Failed",
      "resendEmail": "Resend Verification Email",
      "resendCooldown": "Resend available in {{seconds}}s",
      "contactSupport": "Contact Support",
      "redirecting": "Redirecting you to complete your profile..."
    },
    "passwordReset": {
      "title": "Reset Password",
      "subtitle": "Enter your email address and we'll send you a link to reset your password",
      "email": "Email Address",
      "submit": "Send Reset Link",
      "success": "Reset Link Sent",
      "successMessage": "If an account with this email exists, you will receive a password reset link shortly.",
      "backToLogin": "Back to Sign In"
    },
    "onboarding": {
      "roleSelection": {
        "title": "What brings you to Points of You AI Studio?",
        "subtitle": "Choose your primary role to personalize your experience",
        "facilitator": {
          "title": "Facilitator/Coach",
          "description": "I guide others through Points of You sessions and workshops",
          "features": ["Create and manage sessions", "AI coaching assistance", "Analytics and insights", "Participant management"]
        },
        "participant": {
          "title": "Participant",
          "description": "I participate in sessions and want to explore personal growth",
          "features": ["Join live sessions", "Digital reflection journal", "Personal AI coach", "Progress tracking"]
        },
        "educator": {
          "title": "Educator",
          "description": "I use Points of You in educational settings",
          "features": ["Classroom management", "Student progress tracking", "Educational content", "Assessment tools"]
        },
        "organizationAdmin": {
          "title": "Organization Admin",
          "description": "I manage Points of You for my organization",
          "features": ["User management", "Organization analytics", "Billing management", "Custom branding"]
        }
      }
    }
  }
}
```

### RTL Support for Hebrew

#### CSS Implementation
```css
/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .form-field {
  text-align: right;
}

[dir="rtl"] .form-field label {
  text-align: right;
}

[dir="rtl"] .checkbox-field {
  flex-direction: row-reverse;
}

[dir="rtl"] .checkbox-field input {
  margin-left: 8px;
  margin-right: 0;
}

[dir="rtl"] .navigation {
  flex-direction: row-reverse;
}

[dir="rtl"] .button-group {
  flex-direction: row-reverse;
}

/* Logical properties for better RTL support */
.form-field {
  margin-inline-end: 16px;
  padding-inline-start: 12px;
  border-inline-start: 2px solid var(--primary-color);
}

.navigation-item {
  margin-inline-end: 8px;
}
```

---

## Django Framework Utilization and Duplication Elimination

### ✅ **Django Built-in Features Properly Utilized**

#### **1. Authentication System**
- **✅ Using**: `AbstractUser` instead of custom user model from scratch
- **✅ Using**: Django's built-in password hashing (`set_password()`, `check_password()`)
- **✅ Using**: Django's password validators instead of custom validation
- **✅ Using**: Django's token generator (`default_token_generator`) for email verification
- **✅ Using**: Django's authentication backends and session management
- **❌ Eliminated**: Custom password hashing, custom token generation, custom session handling

#### **2. User Management**
- **✅ Using**: Django's `User.objects.create_user()` method
- **✅ Using**: Django's built-in user fields (`first_name`, `last_name`, `email`, `date_joined`, `last_login`)
- **✅ Using**: Django's `USERNAME_FIELD` and `REQUIRED_FIELDS` configuration
- **✅ Using**: Django's user model managers and querysets
- **❌ Eliminated**: Custom user creation logic, duplicate timestamp fields

#### **3. Email System**
- **✅ Using**: Django's `EmailMultiAlternatives` and email framework
- **✅ Using**: Django's template system for email templates
- **✅ Using**: Django's `render_to_string` for email content
- **✅ Using**: Third-party packages (`anymail`, `django-ses`) instead of custom SMTP
- **❌ Eliminated**: Custom SMTP implementation, custom email templating

#### **4. Security Features**
- **✅ Using**: Django's built-in CSRF protection
- **✅ Using**: Django's security headers and middleware
- **✅ Using**: Django's session security settings
- **✅ Using**: Third-party packages (`django-axes`, `django-otp`) for advanced security
- **❌ Eliminated**: Custom CSRF implementation, custom security headers

#### **5. Permission System**
- **✅ Using**: Django's built-in `Groups` and `Permissions`
- **✅ Using**: Django's `user.has_perm()` permission checking
- **✅ Using**: Django's permission decorators and mixins
- **❌ Eliminated**: Custom permission system, custom role-based access control

#### **6. API Framework**
- **✅ Using**: Django REST Framework's `CreateAPIView`, `UpdateAPIView`, `ModelViewSet`
- **✅ Using**: DRF's built-in serializers and validation
- **✅ Using**: DRF's authentication classes (`JWTAuthentication`, `SessionAuthentication`)
- **✅ Using**: DRF's permission classes (`IsAuthenticated`)
- **❌ Eliminated**: Custom API view implementations, custom authentication

#### **7. Database and ORM**
- **✅ Using**: Django's ORM with proper relationships (`ForeignKey`, `OneToOneField`)
- **✅ Using**: Django's model validation and `clean()` methods
- **✅ Using**: Django's database indexes and constraints
- **✅ Using**: Django's migration system
- **❌ Eliminated**: Custom SQL queries where ORM suffices, custom validation

#### **8. Admin Interface**
- **✅ Using**: Django's built-in admin system
- **✅ Using**: Third-party admin enhancements (`admin-interface`, `django-extensions`)
- **❌ Eliminated**: Custom admin interface from scratch

#### **9. Internationalization**
- **✅ Using**: Django's built-in i18n framework (`USE_I18N`, `LANGUAGES`)
- **✅ Using**: Django's locale system and translation functions
- **✅ Using**: Django's timezone handling (`USE_TZ`)
- **❌ Eliminated**: Custom internationalization implementation

#### **10. Third-Party Integration**
- **✅ Using**: Established Django packages instead of custom implementations:
  - `django-allauth` for social authentication
  - `django-tenants` for multi-tenancy
  - `django-otp` for two-factor authentication
  - `django-axes` for account lockout
  - `django-ratelimit` for rate limiting
  - `rest_framework_simplejwt` for JWT authentication
  - `drf-spectacular` for API documentation

### 🚫 **Eliminated Duplications**

#### **Custom Token Management → Django's Token Generator**
```python
# ❌ BEFORE: Custom token implementation
class EmailVerificationToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    expires_at = models.DateTimeField()
    # Custom token generation and validation logic

# ✅ AFTER: Using Django's built-in token generator
from django.contrib.auth.tokens import default_token_generator
token = default_token_generator.make_token(user)
is_valid = default_token_generator.check_token(user, token)
```

#### **Custom Password Management → Django's Password System**
```python
# ❌ BEFORE: Custom password hashing
import bcrypt
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# ✅ AFTER: Django's built-in password management
user.set_password(password)  # Automatic hashing
user.check_password(password)  # Automatic verification
```

#### **Custom User Creation → Django's User Manager**
```python
# ❌ BEFORE: Custom user creation logic
def create_user(email, password, **extra_fields):
    # Custom validation, hashing, email normalization
    
# ✅ AFTER: Django's built-in user creation
User.objects.create_user(email=email, password=password, **extra_fields)
```

#### **Custom Permission System → Django's Groups and Permissions**
```python
# ❌ BEFORE: Custom role management
class UserRole(models.Model):
    user = models.ForeignKey(User)
    role = models.CharField()
    permissions = models.JSONField()

# ✅ AFTER: Django's built-in permission system
from django.contrib.auth.models import Group, Permission
user.groups.add(group)
user.has_perm('app.permission_name')
```

### 📦 **Django Ecosystem Packages Used**

| Functionality | Django Package | Replaces Custom Implementation |
|--------------|----------------|-------------------------------|
| **Social Auth** | `django-allauth` | Custom OAuth implementation |
| **Multi-tenancy** | `django-tenants` | Custom tenant management |
| **Two-Factor Auth** | `django-otp` | Custom 2FA system |
| **Account Lockout** | `django-axes` | Custom security lockout |
| **Rate Limiting** | `django-ratelimit` | Custom rate limiting |
| **JWT Auth** | `rest_framework_simplejwt` | Custom JWT implementation |
| **Email Service** | `anymail` + `django-ses` | Custom SMTP handling |
| **API Docs** | `drf-spectacular` | Custom API documentation |
| **Admin Interface** | `admin-interface` | Custom admin UI |
| **Database Filters** | `django-filter` | Custom filtering logic |

### 🎯 **Performance and Maintenance Benefits**

#### **Reduced Code Complexity**
- **Before**: ~2,000 lines of custom authentication code
- **After**: ~500 lines leveraging Django's built-in features
- **Reduction**: 75% less custom code to maintain

#### **Security Improvements**
- Using battle-tested Django security features
- Automatic security updates through Django releases
- Reduced attack surface with fewer custom implementations

#### **Development Speed**
- Faster development using Django's conventions
- Less testing required for built-in features
- Better documentation and community support

#### **Long-term Maintenance**
- Django handles security patches automatically
- Easier upgrades with standard Django patterns
- Better compatibility with Django ecosystem

### 🔧 **Implementation Strategy**

#### **Phase 1: Core Django Features** ✅
- Replace custom User model with `AbstractUser`
- Implement Django's authentication system
- Use Django's email framework
- Leverage Django's permission system

#### **Phase 2: Third-party Integration** ✅
- Add `django-allauth` for social authentication
- Implement `django-otp` for two-factor authentication
- Use `django-axes` for security lockout
- Add `rest_framework_simplejwt` for JWT

#### **Phase 3: Advanced Features** ✅
- Implement `django-tenants` for multi-tenancy
- Add `drf-spectacular` for API documentation
- Use `anymail` for email service abstraction
- Enhance admin with `admin-interface`

---

## Participant-Facilitator Relationship Summary

### Verified Relationship Model

The corrected participant-facilitator relationship model ensures:

#### ✅ **Facilitator Access to Participant Information**
- **Session-Level Access**: Facilitators have access to participant information within their own sessions
- **Controlled Data Sharing**: Participants control what data is shared (reflections, engagement metrics)
- **Cross-Session Tracking**: Facilitators can track participant progress across multiple sessions they facilitate
- **Private Notes**: Facilitators can maintain private notes about participants for continuity
- **Collaborative Goals**: Facilitators and participants can set and track goals together

#### ✅ **Participant Multi-Facilitator Support**
- **Multiple Relationships**: Participants can participate in sessions from different facilitators
- **Data Isolation**: Each facilitator only sees data from their own sessions with the participant
- **Privacy Control**: Participants can set different privacy preferences for different facilitators
- **Consent Management**: Explicit consent required for cross-facilitator data sharing

#### ✅ **Key Technical Features**
- **SessionParticipant Model**: Links participants to specific sessions with status tracking
- **ParticipantFacilitatorRelationship Model**: Tracks ongoing relationships across sessions
- **Privacy Controls**: Granular privacy settings per session and facilitator
- **API Endpoints**: Secure endpoints for facilitators to access participant data
- **Data Protection**: GDPR-compliant data handling with participant rights

### Database Relationships
```
User (Participant) ←→ SessionParticipant ←→ Session ←→ User (Facilitator)
                              ↓
                    ParticipantFacilitatorRelationship
                              ↓
                    (Cross-session tracking and notes)
```

### Access Control Matrix
| Data Type | Facilitator Access | Participant Control | Cross-Facilitator |
|-----------|-------------------|-------------------|------------------|
| Basic Info (Name, Email) | ✅ Always | ❌ No Control | ✅ Always |
| Card Selections | ✅ With Consent | ✅ Can Opt-out | ❌ Isolated |
| Reflections | ✅ With Consent | ✅ Can Opt-out | ❌ Isolated |
| Engagement Metrics | ✅ With Consent | ✅ Can Opt-out | ❌ Isolated |
| Session History | ✅ Own Sessions Only | ✅ Full Access | ❌ Isolated |
| Facilitator Notes | ✅ Private to Facilitator | ✅ Can Request View | ❌ Isolated |
| Progress Goals | ✅ Collaborative | ✅ Collaborative | ❌ Isolated |

---

## Conclusion

This comprehensive onboarding and account management system design provides:

1. **Secure Registration Flow**: Multi-step registration with email verification and role-based onboarding
2. **Robust Email System**: Multilingual email templates with secure token-based verification
3. **Password Security**: Industry-standard password reset flow with rate limiting and security monitoring
4. **Role-Based Access**: Tailored experiences for facilitators, participants, educators, and organization admins
5. **Multi-Tenant Support**: Enterprise-grade organization management with custom branding and SSO
6. **Privacy Compliance**: GDPR-compliant data handling with comprehensive user rights
7. **Multilingual Support**: Full internationalization with RTL support for Hebrew
8. **Technical Implementation**: Detailed Django backend and React frontend specifications
9. **✅ Verified Participant-Facilitator Relationships**: Correct data access and multi-facilitator support

### Key Relationship Features:
- **Facilitators** have access to participant information in their sessions (with privacy controls)
- **Participants** can join sessions from multiple facilitators with data isolation
- **Privacy-First Design** with granular consent management
- **Cross-Session Continuity** for ongoing facilitator-participant relationships
- **Secure Data Sharing** with explicit consent mechanisms

The system is designed to scale from individual users to large enterprise deployments while maintaining security, privacy, and user experience standards. The modular architecture allows for iterative implementation and future enhancements.

