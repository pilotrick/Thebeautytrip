import { useState } from 'react';
import { motion } from 'motion/react';
import { ProviderUser } from '../ProviderPortal';
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  Upload,
  Check,
  X,
  Play,
  Pause,
  Camera,
  FileText,
  AlertCircle
} from 'lucide-react';

interface Props {
  provider: ProviderUser;
  activeTab: string;
}

interface ActiveService {
  id: string;
  clientName: string;
  treatment: string;
  scheduledTime: string;
  duration: number;
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

export function WellnessSpecialistDashboard({ provider, activeTab }: Props) {
  const [selectedService, setSelectedService] = useState<ActiveService | null>(null);
  const [serviceInProgress, setServiceInProgress] = useState(false);
  const [serviceStartTime, setServiceStartTime] = useState<Date | null>(null);
  const [postCareNotes, setPostCareNotes] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([]);

  // Mock active services
  const activeServices: ActiveService[] = [
    {
      id: 'service-001',
      clientName: 'Sarah Johnson',
      treatment: 'Post-Procedure Recovery Massage',
      scheduledTime: '2:00 PM Today',
      duration: 60,
      location: 'North Coast Recovery Villa',
      status: 'upcoming'
    },
    {
      id: 'service-002',
      clientName: 'Maria Garcia',
      treatment: 'IV Therapy & Nutrition Consultation',
      scheduledTime: '4:30 PM Today',
      duration: 45,
      location: 'Santo Domingo Wellness Center',
      status: 'upcoming'
    }
  ];

  const handleStartService = (service: ActiveService) => {
    setSelectedService(service);
    setServiceInProgress(true);
    setServiceStartTime(new Date());
  };

  const handleEndService = () => {
    if (postCareNotes.trim().length < 50) {
      alert('Post-care notes must be at least 50 characters to meet SLA requirements');
      return;
    }

    // Submit service completion
    console.log('Service completed:', {
      serviceId: selectedService?.id,
      startTime: serviceStartTime,
      endTime: new Date(),
      notes: postCareNotes,
      media: uploadedMedia
    });

    // Reset
    setServiceInProgress(false);
    setSelectedService(null);
    setPostCareNotes('');
    setUploadedMedia([]);
    setServiceStartTime(null);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedMedia([...uploadedMedia, ...Array.from(e.target.files)]);
    }
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Today's Sessions</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-blush)' }}>5</p>
            <p className="text-xs text-gray-500">3 completed, 2 upcoming</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">This Week</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-gold)' }}>18</p>
            <p className="text-xs text-gray-500">Sessions scheduled</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Avg Rating</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>4.9</p>
            <p className="text-xs text-gray-500">From 127 reviews</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Response Time</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-charcoal)' }}>12m</p>
            <p className="text-xs text-gray-500">Average this month</p>
          </div>
        </div>

        {/* Active Services */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <h3 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
            Today's Schedule
          </h3>

          <div className="space-y-4">
            {activeServices.map((service) => (
              <motion.div
                key={service.id}
                className="p-5 rounded-lg border-2 border-gray-200 hover:border-[var(--bt-blush)] transition-all cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: 'var(--bt-blush)' }}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                          {service.clientName}
                        </p>
                        <p className="text-sm text-gray-600">{service.treatment}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {service.scheduledTime} ({service.duration} min)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {service.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === 'completed' ? 'bg-green-500' :
                          service.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <span className="capitalize">{service.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartService(service);
                    }}
                    className="px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                  >
                    <Play className="w-4 h-4" />
                    Start Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Logging Modal */}
        {selectedService && serviceInProgress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    Service in Progress
                  </h3>
                  <p className="text-gray-600">{selectedService.clientName} • {selectedService.treatment}</p>
                </div>
                <button
                  onClick={() => {
                    setServiceInProgress(false);
                    setSelectedService(null);
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timer */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <Clock className="w-6 h-6" style={{ color: 'var(--bt-blush)' }} />
                    </div>
                    <div>
                      <p className="text-white text-sm">Session Duration</p>
                      <p className="text-white" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        {serviceStartTime ? 
                          Math.floor((new Date().getTime() - serviceStartTime.getTime()) / 60000) : 0
                        } minutes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs">Scheduled</p>
                    <p className="text-white font-semibold">{selectedService.duration} min</p>
                  </div>
                </div>
              </div>

              {/* Treatment Details */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Treatment Type
                </label>
                <input
                  type="text"
                  value={selectedService.treatment}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                />
              </div>

              {/* Post-Care Notes (REQUIRED - SLA) */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Post-Care Instructions
                  <span className="text-red-500 ml-1">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Min 50 characters)</span>
                </label>
                <textarea
                  value={postCareNotes}
                  onChange={(e) => setPostCareNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none transition-colors"
                  placeholder="Enter detailed post-care instructions for the client. These will be translated to their preferred language and appear on their portal..."
                />
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-sm ${postCareNotes.length >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                    {postCareNotes.length} / 50 characters
                  </p>
                  {postCareNotes.length >= 50 && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <Check className="w-4 h-4" />
                      Meets SLA requirement
                    </div>
                  )}
                </div>
              </div>

              {/* Media Upload */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Recommended Meal/Recovery Media (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-1">Upload photos (meal recommendations, etc.)</p>
                    <p className="text-sm text-gray-500">These will appear as visual cards on client portal</p>
                  </label>
                </div>
                {uploadedMedia.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {uploadedMedia.map((file, idx) => (
                      <div key={idx} className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setServiceInProgress(false);
                    setSelectedService(null);
                    setPostCareNotes('');
                    setUploadedMedia([]);
                  }}
                  className="flex-1 px-6 py-4 rounded-full border-2 transition-all hover:scale-105"
                  style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEndService}
                  disabled={postCareNotes.length < 50}
                  className="flex-1 px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                >
                  <Check className="w-5 h-5" />
                  Complete Session & Update Client Portal
                </button>
              </div>

              {/* SLA Warning */}
              {postCareNotes.length < 50 && (
                <div className="mt-4 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900">
                    Post-care notes must meet minimum length requirement to maintain SLA compliance and client satisfaction scores.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'schedule') {
    return (
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
        <h3 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
          Availability Management
        </h3>
        <p className="text-gray-600 mb-6">
          Drag and drop to set your availability. System prevents double-booking automatically.
        </p>
        
        {/* Placeholder for calendar UI */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Interactive calendar interface coming soon</p>
          <p className="text-sm text-gray-500 mt-2">Set weekly availability, block out times, and manage multi-location scheduling</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">Content for this section coming soon</p>
    </div>
  );
}
