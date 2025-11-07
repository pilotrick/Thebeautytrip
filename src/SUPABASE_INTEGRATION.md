# The Beauty Trip - Supabase Integration Guide

## 🎉 **Supabase is Now Connected!**

Your Beauty Trip platform is now fully integrated with Supabase, providing enterprise-grade authentication, data persistence, and backend infrastructure.

---

## 📋 **What's Implemented**

### ✅ **1. Authentication System**
- **Supabase Auth** for secure user management
- Email/password authentication
- OAuth support (Google, Facebook, GitHub)
- Session management with auto-refresh
- Password reset functionality
- Protected routes with JWT verification

### ✅ **2. Backend API (Hono Server)**
Location: `/supabase/functions/server/index.tsx`

#### **User Routes:**
- `GET /make-server-1f5586cd/users/:userId` - Get user profile
- `PUT /make-server-1f5586cd/users/:userId` - Update user profile

#### **Booking Routes:**
- `POST /make-server-1f5586cd/bookings` - Create new booking
- `GET /make-server-1f5586cd/bookings/user/:userId` - Get user bookings
- `GET /make-server-1f5586cd/bookings/:bookingId` - Get specific booking
- `PUT /make-server-1f5586cd/bookings/:bookingId` - Update booking

#### **Group Trip Routes:**
- `POST /make-server-1f5586cd/groups` - Create group trip
- `GET /make-server-1f5586cd/groups/:groupId` - Get group (public)
- `POST /make-server-1f5586cd/groups/:groupId/members` - Add member
- `PUT /make-server-1f5586cd/groups/:groupId/members/:memberId` - Update member
- `POST /make-server-1f5586cd/groups/:groupId/vote` - Vote for sanctuary
- `GET /make-server-1f5586cd/groups/user/:userId` - Get user's groups

#### **Tour Booking Routes:**
- `POST /make-server-1f5586cd/tour-bookings` - Create tour booking

#### **Provider Routes:**
- `POST /make-server-1f5586cd/providers` - Create provider
- `GET /make-server-1f5586cd/providers/email/:email` - Get provider by email
- `PUT /make-server-1f5586cd/providers/:providerId` - Update provider

### ✅ **3. Data Storage**
- **Key-Value Store** via Supabase database
- Persistent user profiles
- Booking history
- Group trip coordination
- Provider credentialing data

### ✅ **4. Frontend Integration**

#### **Updated Components:**
- `Login.tsx` - Now uses Supabase Auth
- `App.tsx` - Session management and auth state monitoring
- All data now persists to Supabase instead of localStorage

#### **New Utilities:**
- `/utils/supabase/client.ts` - Supabase client singleton
- `/utils/auth.ts` - Authentication helpers
- `/utils/api.ts` - API call wrappers

---

## 🚀 **How to Use**

### **For Users:**

#### **1. Sign Up / Sign In**
```typescript
// Sign up new user
await signUp(email, password, name);

// Sign in existing user
await signIn(email, password);

// OAuth sign in
await signInWithOAuth('google'); // or 'facebook', 'github'
```

#### **2. Create Bookings**
```typescript
import { api } from './utils/api';

const booking = await api.createBooking(accessToken, {
  destination: 'dominican-republic',
  procedures: ['veneers', 'botox'],
  specialist: 'dr-smith',
  retreat: 'luxury-villa-1',
  // ... other booking data
});
```

#### **3. Group Trips**
```typescript
// Create group
const group = await api.createGroupTrip(accessToken, {
  groupSize: 6,
  coordinatorName: 'Jane Doe',
  coordinatorEmail: 'jane@example.com',
  // ... other group data
});

// Join group (public - no auth required)
await api.addGroupMember(groupId, {
  name: 'Member Name',
  email: 'member@example.com',
  // ... member data
});

// Vote for sanctuary
await api.voteForSanctuary(groupId, memberId, propertyId);
```

### **For Developers:**

#### **Making Authenticated API Calls**
```typescript
import { getAccessToken } from './utils/auth';
import { api } from './utils/api';

// Get user's access token
const accessToken = await getAccessToken();

// Make authenticated API call
const bookings = await api.getUserBookings(userId, accessToken);
```

#### **Checking Authentication**
```typescript
import { isAuthenticated, getSession } from './utils/auth';

// Check if user is logged in
const loggedIn = await isAuthenticated();

// Get current session
const session = await getSession();
if (session) {
  console.log('User:', session.email);
  console.log('Token:', session.accessToken);
}
```

---

## 🔐 **Security Features**

### **1. Protected Routes**
All user-specific endpoints require authentication:
- JWT verification on every request
- Users can only access their own data
- Service role key never exposed to frontend

### **2. Session Management**
- Auto-refresh tokens
- Persistent sessions across page reloads
- Automatic logout on token expiration

### **3. Data Privacy**
- Group trips are shareable via link (public)
- User bookings are private (auth required)
- Provider data secured with email lookup

---

## 📊 **Data Models**

### **User Profile**
```typescript
{
  userId: string;
  email: string;
  name: string;
  phone?: string;
  preferences?: object;
  createdAt: string;
  updatedAt: string;
}
```

### **Booking**
```typescript
{
  id: string;
  userId: string;
  destination: string;
  procedures: string[];
  selectedSpecialist: string;
  selectedRetreat: string;
  recoveryDays: number;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

### **Group Trip**
```typescript
{
  id: string; // e.g., "BTG-12345678"
  coordinatorId: string;
  groupSize: number;
  celebrationTypes: string[];
  budgetPerPerson: number;
  tripDuration: number;
  procedureFocus: string[];
  members: Member[];
  sanctuaryVotes: { [propertyId: string]: string[] };
  createdAt: string;
  updatedAt: string;
}
```

### **Provider**
```typescript
{
  id: string;
  type: 'wellness' | 'tour' | 'recovery';
  name: string;
  email: string;
  license?: string;
  insurance?: string;
  status: 'pending' | 'approved' | 'active';
  contractSigned: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔧 **Environment Setup**

The following environment variables are automatically configured:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side authentication key
- `SUPABASE_ANON_KEY` - Public anonymous key (safe for frontend)

Project ID and keys are stored in `/utils/supabase/info.tsx`.

---

## 🎯 **Next Steps**

### **Optional Enhancements:**

1. **Email Confirmation**
   - Currently disabled for easier testing
   - Enable in Supabase dashboard → Authentication → Settings

2. **Social Login Setup**
   For Google/Facebook OAuth:
   - Follow: https://supabase.com/docs/guides/auth/social-login/auth-google
   - Add OAuth credentials in Supabase dashboard

3. **Row Level Security (RLS)**
   - Currently using KV store (no RLS needed)
   - If you create custom tables, add RLS policies

4. **Real-time Subscriptions**
   ```typescript
   // Listen for group updates
   supabase
     .channel(`group:${groupId}`)
     .on('postgres_changes', 
       { event: '*', schema: 'public', table: 'groups' },
       (payload) => console.log('Group updated!', payload)
     )
     .subscribe();
   ```

5. **File Uploads**
   ```typescript
   // Upload to Supabase Storage
   const { data, error } = await supabase
     .storage
     .from('user-photos')
     .upload(`${userId}/profile.jpg`, file);
   ```

---

## 🐛 **Troubleshooting**

### **"Failed to sign in"**
- Check email/password are correct
- Ensure user has confirmed email (if enabled)
- Check browser console for detailed errors

### **"Unauthorized" errors**
- Token may have expired - try signing in again
- Check that Authorization header is being sent
- Verify user is accessing their own data only

### **API calls failing**
- Check browser console for error messages
- Verify server logs in Supabase Dashboard → Edge Functions
- Ensure proper error handling in frontend

---

## 📚 **Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [API Reference](/utils/api.ts)

---

## ✨ **Summary**

Your Beauty Trip platform now has:
- ✅ Secure authentication with Supabase
- ✅ Persistent data storage
- ✅ Full backend API
- ✅ Protected user routes
- ✅ Group collaboration features
- ✅ Provider management system
- ✅ Tour booking infrastructure

All bookings, user data, and group trips are now stored securely in Supabase! 🎉
