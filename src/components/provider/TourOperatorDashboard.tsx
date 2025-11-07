import { useState } from 'react';
import { motion } from 'motion/react';
import { ProviderUser } from '../ProviderPortal';
import { 
  MapPin, 
  Car, 
  User, 
  Clock, 
  Camera,
  CheckCircle2,
  AlertCircle,
  Upload,
  Navigation
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Props {
  provider: ProviderUser;
  activeTab: string;
}

interface Transfer {
  id: string;
  clientName: string;
  pickupLocation: string;
  dropoffLocation: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  driverInfo?: {
    name: string;
    photo?: string;
    vehicle: string;
    licensePlate: string;
  };
}

export function TourOperatorDashboard({ provider, activeTab }: Props) {
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [driverName, setDriverName] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);
  const [pickupGPS, setPickupGPS] = useState<{ lat: number; lng: number } | null>(null);
  const [dropoffGPS, setDropoffGPS] = useState<{ lat: number; lng: number } | null>(null);

  // Mock transfers
  const upcomingTransfers: Transfer[] = [
    {
      id: 'transfer-001',
      clientName: 'Sarah Johnson',
      pickupLocation: 'Las Americas International Airport',
      dropoffLocation: 'North Coast Recovery Villa',
      scheduledTime: 'Today 3:00 PM',
      status: 'pending'
    },
    {
      id: 'transfer-002',
      clientName: 'Maria Garcia',
      pickupLocation: 'Santo Domingo Wellness Center',
      dropoffLocation: 'Punta Cana Resort',
      scheduledTime: 'Today 5:30 PM',
      status: 'confirmed',
      driverInfo: {
        name: 'Carlos Rodriguez',
        vehicle: 'Mercedes-Benz S-Class',
        licensePlate: 'A123456'
      }
    }
  ];

  const handleConfirmTransfer = () => {
    if (!driverName || !vehicleModel || !licensePlate) {
      alert('All driver and vehicle details are required');
      return;
    }

    console.log('Transfer confirmed:', {
      transferId: selectedTransfer?.id,
      driver: driverName,
      vehicle: vehicleModel,
      plate: licensePlate,
      photo: driverPhoto
    });

    // This would update client portal with "Meet Your Driver" card
    alert('Transfer confirmed! Client has been notified with driver details.');
    setSelectedTransfer(null);
  };

  const handlePickup = () => {
    // Get GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPickupGPS({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        console.log('Client picked up at:', position.coords);
      });
    }
  };

  const handleDropoff = () => {
    if (!pickupGPS) {
      alert('Must confirm pickup first');
      return;
    }

    // Get GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDropoffGPS({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        
        // Calculate transfer time (mock)
        const transferTime = 45; // minutes
        const slaTime = 60; // SLA allows 60 min
        
        if (transferTime > slaTime + 15) {
          alert('⚠️ SLA BREACH: Transfer exceeded allowed time by more than 15 minutes');
        } else {
          alert('✅ Transfer completed on time! SLA maintained.');
        }
        
        setSelectedTransfer(null);
        setPickupGPS(null);
        setDropoffGPS(null);
      });
    }
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Today's Transfers</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-blush)' }}>6</p>
            <p className="text-xs text-gray-500">2 pending confirmation</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">On-Time Rate</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>97%</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Avg Transfer Time</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-gold)' }}>42m</p>
            <p className="text-xs text-gray-500">Airport to villa</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Client Rating</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-charcoal)' }}>4.8</p>
            <p className="text-xs text-gray-500">From 89 reviews</p>
          </div>
        </div>

        {/* Upcoming Transfers */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <h3 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
            Upcoming Transfers
          </h3>

          <div className="space-y-4">
            {upcomingTransfers.map((transfer) => (
              <motion.div
                key={transfer.id}
                className="p-5 rounded-lg border-2 border-gray-200 hover:border-[var(--bt-blush)] transition-all"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                      style={{ backgroundColor: 'var(--bt-blush)' }}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                        {transfer.clientName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {transfer.scheduledTime}
                      </p>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    transfer.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    transfer.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    transfer.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {transfer.status === 'pending' && '⚠️ Needs Confirmation'}
                    {transfer.status === 'confirmed' && '✓ Confirmed'}
                    {transfer.status === 'in-progress' && '🚗 In Progress'}
                    {transfer.status === 'completed' && '✓ Completed'}
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4 pl-13">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-semibold">{transfer.pickupLocation}</p>
                    </div>
                    <div className="h-8 w-0.5 bg-gray-300 ml-2"></div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <p className="text-sm font-semibold">{transfer.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Driver Info (if confirmed) */}
                {transfer.driverInfo && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-green-700" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-900">
                          Driver: {transfer.driverInfo.name}
                        </p>
                        <p className="text-xs text-green-700">
                          {transfer.driverInfo.vehicle} • {transfer.driverInfo.licensePlate}
                        </p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {transfer.status === 'pending' && (
                    <button
                      onClick={() => setSelectedTransfer(transfer)}
                      className="flex-1 px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                    >
                      Confirm Vehicle & Driver
                    </button>
                  )}
                  {transfer.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedTransfer(transfer);
                          handlePickup();
                        }}
                        className="flex-1 px-4 py-2 rounded-full transition-all hover:scale-105"
                        style={{ backgroundColor: 'var(--bt-blush)', color: 'white', fontWeight: '600' }}
                      >
                        <Navigation className="w-4 h-4 inline mr-2" />
                        Client Picked Up
                      </button>
                      <button
                        className="px-4 py-2 rounded-full border-2 transition-all hover:scale-105"
                        style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)' }}
                      >
                        Edit Details
                      </button>
                    </>
                  )}
                  {transfer.status === 'in-progress' && (
                    <button
                      onClick={handleDropoff}
                      className="flex-1 px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{ backgroundColor: '#10b981', color: 'white', fontWeight: '600' }}
                    >
                      <CheckCircle2 className="w-4 h-4 inline mr-2" />
                      Client Dropped Off
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transfer Confirmation Modal */}
        {selectedTransfer && selectedTransfer.status === 'pending' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                Confirm Transfer Details
              </h3>

              <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>SLA Requirement:</strong> Driver and vehicle details must be submitted at least 2 hours before pickup time.
                </p>
                <p className="text-xs text-blue-700">
                  Client will receive a "Meet Your Driver" card on their portal with photo, vehicle details, and your verified stamp.
                </p>
              </div>

              {/* Driver Name */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Driver Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  placeholder="e.g., Carlos Rodriguez"
                />
              </div>

              {/* Vehicle Model */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Vehicle Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  placeholder="e.g., Mercedes-Benz S-Class"
                />
              </div>

              {/* License Plate */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  License Plate <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  placeholder="e.g., A123456"
                />
              </div>

              {/* Driver Photo */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Driver Photo (Recommended)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setDriverPhoto(e.target.files?.[0] || null)}
                    className="hidden"
                    id="driver-photo"
                  />
                  <label htmlFor="driver-photo" className="cursor-pointer">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">Upload driver photo</p>
                    <p className="text-sm text-gray-500">Builds trust with clients</p>
                  </label>
                </div>
                {driverPhoto && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {driverPhoto.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTransfer(null)}
                  className="flex-1 px-6 py-4 rounded-full border-2 transition-all hover:scale-105"
                  style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmTransfer}
                  disabled={!driverName || !vehicleModel || !licensePlate}
                  className="flex-1 px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Confirm & Notify Client
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">Content for this section coming soon</p>
    </div>
  );
}
