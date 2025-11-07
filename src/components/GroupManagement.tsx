import React, { useState } from 'react';
import { Users, Mail, DollarSign, Crown, UserCheck, Eye, Send, Copy, Check, Vote, Home, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import {toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  budget: number;
  role: 'coordinator' | 'member';
  joinStatus: 'invited' | 'joined' | 'in-progress' | 'completed';
  uniqueFunnelLink: string;
  joinedDate?: string;
  selectedProcedures?: string[];
  bookingProgress?: number;
}

export interface SanctuaryVote {
  propertyId: string;
  propertyName: string;
  votes: string[]; // array of member IDs who voted for this
  capacity: number;
}

export interface GroupBooking {
  groupId: string;
  groupName: string;
  createdDate: string;
  leader: GroupMember;
  members: GroupMember[];
  totalBudget: number;
  sanctuaryOptions?: SanctuaryVote[];
  votingDeadline?: string;
}

interface GroupManagementProps {
  groupBooking: GroupBooking;
  onUpdateLeader: (newLeaderId: string) => void;
  onUpdateMemberBudget: (memberId: string, budget: number) => void;
  onSendInvitations: (memberIds: string[]) => void;
  onViewGroupTrip: () => void;
  onVoteForSanctuary?: (propertyId: string, memberId: string) => void;
}

export function GroupManagement({
  groupBooking,
  onUpdateLeader,
  onUpdateMemberBudget,
  onSendInvitations,
  onViewGroupTrip,
  onVoteForSanctuary
}: GroupManagementProps) {
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [budgetValue, setBudgetValue] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const allMembers = [groupBooking.leader, ...groupBooking.members];

  const handleCopyLink = async (link: string, memberId: string) => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopiedLink(memberId);
      toast.success('Funnel link copied to clipboard!');
      setTimeout(() => setCopiedLink(null), 2000);
    } else {
      toast.error('Failed to copy link. Please copy manually.');
    }
  };

  const handleUpdateBudget = (memberId: string) => {
    onUpdateMemberBudget(memberId, budgetValue);
    setEditingBudget(null);
    toast.success('Budget updated successfully');
  };

  const handleSendInvite = (member: GroupMember) => {
    onSendInvitations([member.id]);
    toast.success(`Invitation sent to ${member.email}`);
  };

  const handleSendAllInvites = () => {
    const pendingMembers = allMembers.filter(m => m.inviteStatus === 'pending').map(m => m.id);
    if (pendingMembers.length > 0) {
      onSendInvitations(pendingMembers);
      toast.success(`${pendingMembers.length} invitations sent successfully!`);
    } else {
      toast.info('All invitations have already been sent');
    }
  };

  return (
    <div className=\"max-w-6xl mx-auto px-6 py-12\">
      {/* Header */}
      <div className=\"mb-12\">
        <div className=\"flex items-center justify-between mb-4\">
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', marginBottom: '0.5rem' }}>
              {groupBooking.groupName}
            </h1>
            <p className=\"text-gray-600\" style={{ fontSize: '1.125rem' }}>
              Group ID: <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>{groupBooking.groupId}</span>
            </p>
          </div>
          <Button
            onClick={onViewGroupTrip}
            className=\"flex items-center gap-2\"
            style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}
          >
            <Eye className=\"w-4 h-4\" />
            View Group Trip
          </Button>
        </div>

        {/* Live Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-blush)' }}>
            <div className=\"flex items-center gap-3 mb-2\">
              <Users className=\"w-6 h-6\" style={{ color: 'var(--bt-blush)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>Total Members</h3>
            </div>
            <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
              {allMembers.length}
            </p>
          </Card>

          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-gold)' }}>
            <div className=\"flex items-center gap-3 mb-2\">
              <DollarSign className=\"w-6 h-6\" style={{ color: 'var(--bt-gold)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>Total Budget</h3>
            </div>
            <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
              ${groupBooking.totalBudget.toLocaleString()}
            </p>
          </Card>

          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-charcoal)' }}>
            <div className=\"flex items-center gap-3 mb-2\">
              <UserCheck className=\"w-6 h-6\" style={{ color: 'var(--bt-charcoal)' }} />
              <h3 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>Joined</h3>
            </div>
            <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
              {allMembers.filter(m => m.inviteStatus === 'accepted').length}/{allMembers.length}
            </p>
          </Card>

          <Card className=\"p-6 border-2\" style={{ borderColor: '#10b981' }}>
            <div className=\"flex items-center gap-3 mb-2\">
              <svg className=\"w-6 h-6\" style={{ color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>Completed</h3>
            </div>
            <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
              {allMembers.filter(m => m.inviteStatus === 'accepted').length}
            </p>
          </Card>
        </div>

        {/* Live Update Banner */}
        <div className=\"mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-between\">
          <div className=\"flex items-center gap-3\">
            <div className=\"w-3 h-3 bg-green-500 rounded-full animate-pulse\"></div>
            <p className=\"text-sm\" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              Live Updates Active - You'll see changes as members join and complete their bookings
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className=\"text-sm px-4 py-2 rounded-lg border-2 border-green-500 hover:bg-green-100\"
            style={{ color: 'var(--bt-charcoal)' }}
          >
            Refresh Now
          </button>
        </div>
      </div>

      {/* Sanctuary Voting Section */}
      {groupBooking.sanctuaryOptions && groupBooking.sanctuaryOptions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Sanctuary Voting
              </h2>
              <p className="text-gray-600 mt-1">Group members vote on preferred properties</p>
            </div>
            {groupBooking.votingDeadline && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Voting Deadline</p>
                <p style={{ color: 'var(--bt-blush)', fontWeight: '600' }}>
                  {groupBooking.votingDeadline}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {groupBooking.sanctuaryOptions.map((sanctuary) => {
              const votePercentage = (sanctuary.votes.length / allMembers.length) * 100;
              const isWinning = sanctuary.votes.length === Math.max(...groupBooking.sanctuaryOptions!.map(s => s.votes.length));
              
              return (
                <Card
                  key={sanctuary.propertyId}
                  className="p-6 border-2"
                  style={{
                    borderColor: isWinning && sanctuary.votes.length > 0 ? 'var(--bt-gold)' : '#e5e7eb',
                    backgroundColor: isWinning && sanctuary.votes.length > 0 ? '#fffef8' : 'white'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Home className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        {sanctuary.propertyName}
                      </h3>
                    </div>
                    {isWinning && sanctuary.votes.length > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}>
                        Leading
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {sanctuary.votes.length} of {allMembers.length} votes
                      </span>
                      <span className="text-sm" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                        {Math.round(votePercentage)}%
                      </span>
                    </div>
                    <Progress value={votePercentage} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {sanctuary.capacity} guests</span>
                  </div>

                  {sanctuary.votes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Voted by:</p>
                      <div className="flex flex-wrap gap-2">
                        {sanctuary.votes.map((memberId) => {
                          const member = allMembers.find(m => m.id === memberId);
                          return member ? (
                            <span
                              key={memberId}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100"
                              style={{ color: 'var(--bt-charcoal)' }}
                            >
                              {member.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="p-6 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
            <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              ℹ️ Voting Instructions
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Each member votes in their personal booking portal after joining</li>
              <li>• Property with the most votes will be selected for the group</li>
              <li>• For groups over 13, multiple properties may be booked based on capacity</li>
              <li>• Voting closes 48 hours before the trip departure date</li>
            </ul>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2" style={{ borderColor: 'var(--bt-gold)' }}>
        <h3 className="mb-4" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          Quick Actions
        </h3>
        <div className="flex gap-4">
          <Button
            onClick={handleSendAllInvites}
            className="flex items-center gap-2"
            style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}
          >
            <Send className="w-4 h-4" />
            Send All Pending Invitations
          </Button>
        </div>
      </div>

      {/* Members List */}
      <div>
        <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          Group Members & Budgets
        </h2>

        <div className=\"space-y-4\">
          {allMembers.map((member) => (
            <Card
              key={member.id}
              className=\"p-6 border-2 transition-all hover:shadow-lg\"
              style={{
                borderColor: member.role === 'leader' ? 'var(--bt-gold)' : 'var(--bt-blush)'
              }}
            >
              <div className=\"flex items-center justify-between\">
                {/* Member Info */}
                <div className=\"flex items-center gap-4 flex-1\">
                  {member.role === 'leader' && (
                    <Crown className=\"w-6 h-6\" style={{ color: 'var(--bt-gold)' }} />
                  )}
                  <div>
                    <div className=\"flex items-center gap-2\">
                      <h4 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        {member.name}
                      </h4>
                      {member.role === 'leader' && (
                        <span
                          className=\"px-2 py-1 text-xs rounded\"
                          style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}
                        >
                          Group Leader
                        </span>
                      )}
                    </div>
                    <p className=\"text-sm text-gray-600\">{member.email}</p>
                    <p className=\"text-xs mt-1\">
                      Status:{' '}
                      <span
                        style={{
                          color:
                            member.inviteStatus === 'accepted'
                              ? 'green'
                              : member.inviteStatus === 'sent'
                              ? 'orange'
                              : 'gray'
                        }}
                      >
                        {member.inviteStatus.charAt(0).toUpperCase() + member.inviteStatus.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Budget Section */}
                <div className=\"flex items-center gap-4\">
                  {editingBudget === member.id ? (
                    <div className=\"flex items-center gap-2\">
                      <DollarSign className=\"w-4 h-4 text-gray-500\" />
                      <Input
                        type=\"number\"
                        value={budgetValue}
                        onChange={(e) => setBudgetValue(Number(e.target.value))}
                        className=\"w-32\"
                        autoFocus
                      />
                      <Button
                        onClick={() => handleUpdateBudget(member.id)}
                        size=\"sm\"
                        style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingBudget(null)}
                        size=\"sm\"
                        variant=\"outline\"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className=\"text-right\">
                      <p className=\"text-sm text-gray-600\">Individual Budget</p>
                      <p
                        className=\"cursor-pointer hover:underline\"
                        style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}
                        onClick={() => {
                          setEditingBudget(member.id);
                          setBudgetValue(member.budget);
                        }}
                      >
                        ${member.budget.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className=\"flex flex-col gap-2\">
                    {member.inviteStatus === 'pending' && (
                      <Button
                        onClick={() => handleSendInvite(member)}
                        size=\"sm\"
                        className=\"flex items-center gap-1\"
                        style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}
                      >
                        <Send className=\"w-3 h-3\" />
                        Send Invite
                      </Button>
                    )}

                    <Button
                      onClick={() => handleCopyLink(member.uniqueFunnelLink, member.id)}
                      size=\"sm\"
                      variant=\"outline\"
                      className=\"flex items-center gap-1\"
                    >
                      {copiedLink === member.id ? (
                        <>
                          <Check className=\"w-3 h-3\" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className=\"w-3 h-3\" />
                          Copy Link
                        </>
                      )}
                    </Button>

                    {member.role !== 'leader' && (
                      <Button
                        onClick={() => {
                          if (confirm(`Make ${member.name} the new group leader?`)) {
                            onUpdateLeader(member.id);
                            toast.success(`${member.name} is now the group leader`);
                          }
                        }}
                        size=\"sm\"
                        variant=\"outline\"
                        className=\"flex items-center gap-1\"
                      >
                        <Crown className=\"w-3 h-3\" />
                        Make Leader
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Funnel Link Display */}
              <div className=\"mt-4 p-3 bg-gray-50 rounded text-xs font-mono break-all text-gray-600\">
                {member.uniqueFunnelLink}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
