import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role for auth verification
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware to verify user authentication for protected routes
async function verifyAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    console.error('Auth verification error:', error);
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }

  // Attach user to context
  c.set('user', user);
  await next();
}

// Health check endpoint
app.get("/make-server-1f5586cd/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== USER PROFILE ROUTES ====================

// Get user profile
app.get("/make-server-1f5586cd/users/:userId", verifyAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = c.get('user');

    // Ensure user can only access their own profile
    if (user.id !== userId) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const profile = await kv.get(`user:${userId}`);
    
    if (!profile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    console.error('Get user profile error:', error);
    return c.json({ error: 'Failed to get user profile', details: String(error) }, 500);
  }
});

// Update user profile
app.put("/make-server-1f5586cd/users/:userId", verifyAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = c.get('user');

    if (user.id !== userId) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const data = await c.req.json();
    await kv.set(`user:${userId}`, { ...data, userId, updatedAt: new Date().toISOString() });

    return c.json({ success: true, profile: data });
  } catch (error) {
    console.error('Update user profile error:', error);
    return c.json({ error: 'Failed to update profile', details: String(error) }, 500);
  }
});

// ==================== BOOKING ROUTES ====================

// Create a booking
app.post("/make-server-1f5586cd/bookings", verifyAuth, async (c) => {
  try {
    const user = c.get('user');
    const bookingData = await c.req.json();
    
    const bookingId = `booking:${user.id}:${Date.now()}`;
    const booking = {
      id: bookingId,
      userId: user.id,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(bookingId, booking);
    
    // Add to user's booking list
    const userBookingsKey = `user:${user.id}:bookings`;
    const userBookings = await kv.get(userBookingsKey) || [];
    userBookings.push(bookingId);
    await kv.set(userBookingsKey, userBookings);

    return c.json({ success: true, booking });
  } catch (error) {
    console.error('Create booking error:', error);
    return c.json({ error: 'Failed to create booking', details: String(error) }, 500);
  }
});

// Get user's bookings
app.get("/make-server-1f5586cd/bookings/user/:userId", verifyAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = c.get('user');

    if (user.id !== userId) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const userBookingsKey = `user:${userId}:bookings`;
    const bookingIds = await kv.get(userBookingsKey) || [];
    
    const bookings = await kv.mget(bookingIds);
    
    return c.json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    return c.json({ error: 'Failed to get bookings', details: String(error) }, 500);
  }
});

// Get specific booking
app.get("/make-server-1f5586cd/bookings/:bookingId", verifyAuth, async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const user = c.get('user');

    const booking = await kv.get(bookingId);
    
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    if (booking.userId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    return c.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    return c.json({ error: 'Failed to get booking', details: String(error) }, 500);
  }
});

// Update booking
app.put("/make-server-1f5586cd/bookings/:bookingId", verifyAuth, async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const user = c.get('user');
    const updates = await c.req.json();

    const booking = await kv.get(bookingId);
    
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    if (booking.userId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const updatedBooking = {
      ...booking,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(bookingId, updatedBooking);

    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error('Update booking error:', error);
    return c.json({ error: 'Failed to update booking', details: String(error) }, 500);
  }
});

// ==================== GROUP TRIP ROUTES ====================

// Create group trip
app.post("/make-server-1f5586cd/groups", verifyAuth, async (c) => {
  try {
    const user = c.get('user');
    const groupData = await c.req.json();
    
    const groupId = `BTG-${Date.now().toString().slice(-8)}`;
    const group = {
      id: groupId,
      coordinatorId: user.id,
      ...groupData,
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`group:${groupId}`, group);
    
    // Add to user's groups
    const userGroupsKey = `user:${user.id}:groups`;
    const userGroups = await kv.get(userGroupsKey) || [];
    userGroups.push(groupId);
    await kv.set(userGroupsKey, userGroups);

    return c.json({ success: true, group });
  } catch (error) {
    console.error('Create group error:', error);
    return c.json({ error: 'Failed to create group', details: String(error) }, 500);
  }
});

// Get group trip (public - anyone with link can view)
app.get("/make-server-1f5586cd/groups/:groupId", async (c) => {
  try {
    const groupId = c.req.param('groupId');
    const group = await kv.get(`group:${groupId}`);
    
    if (!group) {
      return c.json({ error: 'Group not found' }, 404);
    }

    return c.json({ group });
  } catch (error) {
    console.error('Get group error:', error);
    return c.json({ error: 'Failed to get group', details: String(error) }, 500);
  }
});

// Add member to group
app.post("/make-server-1f5586cd/groups/:groupId/members", async (c) => {
  try {
    const groupId = c.req.param('groupId');
    const memberData = await c.req.json();
    
    const group = await kv.get(`group:${groupId}`);
    
    if (!group) {
      return c.json({ error: 'Group not found' }, 404);
    }

    const memberId = `member:${Date.now()}`;
    const member = {
      id: memberId,
      ...memberData,
      joinedAt: new Date().toISOString(),
    };

    group.members.push(member);
    group.updatedAt = new Date().toISOString();
    
    await kv.set(`group:${groupId}`, group);

    return c.json({ success: true, member, group });
  } catch (error) {
    console.error('Add group member error:', error);
    return c.json({ error: 'Failed to add member', details: String(error) }, 500);
  }
});

// Update group member
app.put("/make-server-1f5586cd/groups/:groupId/members/:memberId", async (c) => {
  try {
    const groupId = c.req.param('groupId');
    const memberId = c.req.param('memberId');
    const updates = await c.req.json();
    
    const group = await kv.get(`group:${groupId}`);
    
    if (!group) {
      return c.json({ error: 'Group not found' }, 404);
    }

    const memberIndex = group.members.findIndex((m: any) => m.id === memberId);
    if (memberIndex === -1) {
      return c.json({ error: 'Member not found' }, 404);
    }

    group.members[memberIndex] = {
      ...group.members[memberIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    group.updatedAt = new Date().toISOString();
    
    await kv.set(`group:${groupId}`, group);

    return c.json({ success: true, member: group.members[memberIndex], group });
  } catch (error) {
    console.error('Update group member error:', error);
    return c.json({ error: 'Failed to update member', details: String(error) }, 500);
  }
});

// Vote for sanctuary
app.post("/make-server-1f5586cd/groups/:groupId/vote", async (c) => {
  try {
    const groupId = c.req.param('groupId');
    const { memberId, propertyId } = await c.req.json();
    
    const group = await kv.get(`group:${groupId}`);
    
    if (!group) {
      return c.json({ error: 'Group not found' }, 404);
    }

    if (!group.sanctuaryVotes) {
      group.sanctuaryVotes = {};
    }

    if (!group.sanctuaryVotes[propertyId]) {
      group.sanctuaryVotes[propertyId] = [];
    }

    // Remove previous vote from this member
    for (const propId in group.sanctuaryVotes) {
      group.sanctuaryVotes[propId] = group.sanctuaryVotes[propId].filter((id: string) => id !== memberId);
    }

    // Add new vote
    group.sanctuaryVotes[propertyId].push(memberId);
    group.updatedAt = new Date().toISOString();
    
    await kv.set(`group:${groupId}`, group);

    return c.json({ success: true, votes: group.sanctuaryVotes });
  } catch (error) {
    console.error('Vote for sanctuary error:', error);
    return c.json({ error: 'Failed to record vote', details: String(error) }, 500);
  }
});

// Get user's groups
app.get("/make-server-1f5586cd/groups/user/:userId", verifyAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = c.get('user');

    if (user.id !== userId) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const userGroupsKey = `user:${userId}:groups`;
    const groupIds = await kv.get(userGroupsKey) || [];
    
    const groupKeys = groupIds.map((id: string) => `group:${id}`);
    const groups = await kv.mget(groupKeys);
    
    return c.json({ groups });
  } catch (error) {
    console.error('Get user groups error:', error);
    return c.json({ error: 'Failed to get groups', details: String(error) }, 500);
  }
});

// ==================== TOUR BOOKING ROUTES ====================

// Create tour booking
app.post("/make-server-1f5586cd/tour-bookings", verifyAuth, async (c) => {
  try {
    const user = c.get('user');
    const tourData = await c.req.json();
    
    const tourBookingId = `tour:${user.id}:${Date.now()}`;
    const tourBooking = {
      id: tourBookingId,
      userId: user.id,
      ...tourData,
      status: 'pending',
      depositRequired: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(tourBookingId, tourBooking);
    
    // Add to user's tour bookings
    const userToursKey = `user:${user.id}:tours`;
    const userTours = await kv.get(userToursKey) || [];
    userTours.push(tourBookingId);
    await kv.set(userToursKey, userTours);

    return c.json({ success: true, tourBooking });
  } catch (error) {
    console.error('Create tour booking error:', error);
    return c.json({ error: 'Failed to create tour booking', details: String(error) }, 500);
  }
});

// ==================== PROVIDER ROUTES ====================

// Create provider
app.post("/make-server-1f5586cd/providers", async (c) => {
  try {
    const providerData = await c.req.json();
    
    const providerId = `provider:${providerData.type}:${Date.now()}`;
    const provider = {
      id: providerId,
      ...providerData,
      status: 'pending',
      contractSigned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(providerId, provider);
    
    // Index by email for login
    await kv.set(`provider:email:${providerData.email}`, providerId);

    return c.json({ success: true, provider });
  } catch (error) {
    console.error('Create provider error:', error);
    return c.json({ error: 'Failed to create provider', details: String(error) }, 500);
  }
});

// Get provider by email
app.get("/make-server-1f5586cd/providers/email/:email", async (c) => {
  try {
    const email = decodeURIComponent(c.req.param('email'));
    const providerId = await kv.get(`provider:email:${email}`);
    
    if (!providerId) {
      return c.json({ error: 'Provider not found' }, 404);
    }

    const provider = await kv.get(providerId);
    
    return c.json({ provider });
  } catch (error) {
    console.error('Get provider error:', error);
    return c.json({ error: 'Failed to get provider', details: String(error) }, 500);
  }
});

// Update provider
app.put("/make-server-1f5586cd/providers/:providerId", async (c) => {
  try {
    const providerId = c.req.param('providerId');
    const updates = await c.req.json();

    const provider = await kv.get(providerId);
    
    if (!provider) {
      return c.json({ error: 'Provider not found' }, 404);
    }

    const updatedProvider = {
      ...provider,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(providerId, updatedProvider);

    return c.json({ success: true, provider: updatedProvider });
  } catch (error) {
    console.error('Update provider error:', error);
    return c.json({ error: 'Failed to update provider', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);