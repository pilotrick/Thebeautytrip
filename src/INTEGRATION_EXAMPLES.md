# Supabase Integration - Code Examples

## Real-World Usage Examples

### 📝 **Example 1: Save Booking After Journey Completion**

Update `Step5Summary.tsx` to save bookings:

```typescript
import { api } from '../utils/api';
import { getAccessToken } from '../utils/auth';
import { toast } from 'sonner@2.0.3';

// Inside your component
const handleSaveBooking = async () => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      toast.error('Please sign in to save your booking');
      // Redirect to login
      return;
    }

    const booking = await api.createBooking(accessToken, {
      destination: selectedDestination,
      procedures: selectedProcedures,
      specialist: selectedSpecialist,
      retreat: selectedRetreat,
      recoveryDays,
      groupData: groupData || null,
      isTourTrip: isTourTrip,
      tourTripBooking: tourTripBooking || null,
    });

    toast.success('Booking saved successfully!');
    console.log('Booking created:', booking);
  } catch (error) {
    console.error('Failed to save booking:', error);
    toast.error('Failed to save booking');
  }
};
```

---

### 👥 **Example 2: Create Group Trip**

Update `GroupThankYou.tsx` to save groups:

```typescript
import { api } from '../utils/api';
import { getAccessToken } from '../utils/auth';
import { toast } from 'sonner@2.0.3';

const handleCreateGroup = async (groupData: GroupData) => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      // For groups, we might allow creation without login
      // but coordinator needs to sign in
      toast.error('Coordinator must sign in to create group');
      return;
    }

    const group = await api.createGroupTrip(accessToken, {
      groupSize: groupData.groupSize,
      celebrationTypes: groupData.celebrationTypes,
      budgetPerPerson: groupData.budgetPerPerson,
      tripDuration: groupData.tripDuration,
      procedureFocus: groupData.procedureFocus,
      coordinatorName: groupData.coordinatorName,
      coordinatorEmail: groupData.coordinatorEmail,
      coordinatorPhone: groupData.coordinatorPhone,
    });

    toast.success(`Group ${group.group.id} created!`);
    return group.group.id;
  } catch (error) {
    console.error('Failed to create group:', error);
    toast.error('Failed to create group');
  }
};
```

---

### 🎫 **Example 3: Join Group Trip**

Update `JoinGroupTrip.tsx`:

```typescript
import { api } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { useState, useEffect } from 'react';

const JoinGroupTrip = ({ groupId, onComplete }) => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch group details
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const result = await api.getGroupTrip(groupId);
        setGroup(result.group);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch group:', error);
        toast.error('Group not found');
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleJoinGroup = async (memberData) => {
    try {
      const member = await api.addGroupMember(groupId, {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone,
        budget: memberData.budget,
      });

      toast.success('Successfully joined the group!');
      onComplete(memberData);
    } catch (error) {
      console.error('Failed to join group:', error);
      toast.error('Failed to join group');
    }
  };

  // ... rest of component
};
```

---

### 🏥 **Example 4: Provider Registration**

Update `ProviderOnboarding.tsx`:

```typescript
import { api } from '../utils/api';
import { toast } from 'sonner@2.0.3';

const handleProviderRegistration = async (formData) => {
  try {
    const provider = await api.createProvider({
      type: providerType, // 'wellness', 'tour', or 'recovery'
      name: formData.name,
      email: formData.email,
      license: formData.license,
      insurance: formData.insurance,
      jurisdiction: formData.jurisdiction,
      currency: formData.currency,
    });

    toast.success('Provider application submitted!');
    console.log('Provider created:', provider);
    
    // Move to next step
    setCurrentStep('contract');
  } catch (error) {
    console.error('Failed to create provider:', error);
    toast.error('Failed to submit application');
  }
};

const handleContractSigning = async (providerId) => {
  try {
    const updatedProvider = await api.updateProvider(providerId, {
      contractSigned: true,
      signedAt: new Date().toISOString(),
    });

    toast.success('Contract signed successfully!');
    onComplete(updatedProvider.provider);
  } catch (error) {
    console.error('Failed to update provider:', error);
    toast.error('Failed to sign contract');
  }
};
```

---

### 📊 **Example 5: Load User's Booking History**

In `TransformationPortal.tsx`:

```typescript
import { api } from '../utils/api';
import { getSession } from '../utils/auth';
import { useState, useEffect } from 'react';

const TransformationPortal = ({ userEmail, ... }) => {
  const [bookings, setBookings] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await getSession();
        
        if (!session) {
          console.log('No session found');
          setLoading(false);
          return;
        }

        // Load bookings
        const bookingsData = await api.getUserBookings(
          session.id,
          session.accessToken
        );
        setBookings(bookingsData.bookings || []);

        // Load groups
        const groupsData = await api.getUserGroups(
          session.id,
          session.accessToken
        );
        setGroups(groupsData.groups || []);

        setLoading(false);
      } catch (error) {
        console.error('Failed to load user data:', error);
        setLoading(false);
      }
    };

    loadUserData();
  }, [userEmail]);

  // ... rest of component
};
```

---

### 🗳️ **Example 6: Sanctuary Voting**

In `GroupSanctuarySelection.tsx`:

```typescript
import { api } from '../utils/api';
import { toast } from 'sonner@2.0.3';

const handleVote = async (groupId, memberId, propertyId) => {
  try {
    const result = await api.voteForSanctuary(groupId, memberId, propertyId);
    
    toast.success('Vote recorded!');
    console.log('Current votes:', result.votes);
    
    // Update UI with new vote counts
    setVotes(result.votes);
  } catch (error) {
    console.error('Failed to record vote:', error);
    toast.error('Failed to record vote');
  }
};
```

---

### 🔐 **Example 7: Protected Route Wrapper**

Create a wrapper component for protected pages:

```typescript
// components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import { Login } from './Login';

export function ProtectedRoute({ children, onLogin }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Login onLogin={onLogin} onBack={() => {}} />;
  }

  return <>{children}</>;
}

// Usage in App.tsx
<ProtectedRoute onLogin={handleLogin}>
  <TransformationPortal {...props} />
</ProtectedRoute>
```

---

### 🎯 **Example 8: Update Booking Status**

```typescript
import { api } from '../utils/api';
import { getAccessToken } from '../utils/auth';

const handleUpdateBooking = async (bookingId, newStatus) => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      toast.error('Authentication required');
      return;
    }

    const updated = await api.updateBooking(bookingId, accessToken, {
      status: newStatus, // 'confirmed', 'completed', etc.
      updatedAt: new Date().toISOString(),
    });

    toast.success('Booking updated!');
    return updated.booking;
  } catch (error) {
    console.error('Failed to update booking:', error);
    toast.error('Failed to update booking');
  }
};
```

---

## 🎨 **Best Practices**

### 1. **Always Check for Auth Token**
```typescript
const accessToken = await getAccessToken();
if (!accessToken) {
  // Redirect to login or show error
  return;
}
```

### 2. **Handle Errors Gracefully**
```typescript
try {
  const result = await api.someMethod(...);
  toast.success('Success!');
} catch (error) {
  console.error('API Error:', error);
  toast.error('Something went wrong');
}
```

### 3. **Show Loading States**
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await api.someMethod(...);
  } finally {
    setLoading(false);
  }
};
```

### 4. **Update UI Optimistically**
```typescript
// Update UI immediately
setBookings([...bookings, newBooking]);

// Then sync with backend
try {
  await api.createBooking(...);
} catch (error) {
  // Rollback on error
  setBookings(bookings);
  toast.error('Failed to save');
}
```

---

## 📱 **Quick Reference**

### **Auth Functions**
```typescript
import { 
  signUp,
  signIn, 
  signOut,
  getSession,
  isAuthenticated,
  getAccessToken 
} from './utils/auth';
```

### **API Functions**
```typescript
import { api } from './utils/api';

// All available methods:
api.getUserProfile(userId, token)
api.updateUserProfile(userId, token, data)
api.createBooking(token, data)
api.getUserBookings(userId, token)
api.getBooking(bookingId, token)
api.updateBooking(bookingId, token, data)
api.createGroupTrip(token, data)
api.getGroupTrip(groupId)
api.addGroupMember(groupId, data)
api.updateGroupMember(groupId, memberId, data)
api.voteForSanctuary(groupId, memberId, propertyId)
api.getUserGroups(userId, token)
api.createTourBooking(token, data)
api.createProvider(data)
api.getProvider(email)
api.updateProvider(providerId, data)
```

---

## 🚀 **Next Steps**

1. Add these examples to your actual components
2. Test the full flow: sign up → create booking → view in portal
3. Test group creation and member joining
4. Test provider onboarding
5. Monitor API calls in browser DevTools Network tab
6. Check server logs in Supabase Dashboard

Happy coding! 🎉
