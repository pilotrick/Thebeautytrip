interface GroupStep4ProceduresProps {
  procedureFocus: string[];
  onToggleProcedure: (id: string) => void;
}

export function GroupStep4Procedures({ procedureFocus, onToggleProcedure }: GroupStep4ProceduresProps) {
  const procedures = [
    { id: 'injectables', name: 'Injectables & Fillers', icon: '💉' },
    { id: 'dental', name: 'Dental (Veneers, Whitening)', icon: '😁' },
    { id: 'skin', name: 'Skin Treatments (Laser, Peels)', icon: '✨' },
    { id: 'hair', name: 'Hair (Transplant, Styling)', icon: '💇' },
    { id: 'body', name: 'Body Contouring', icon: '💃' },
    { id: 'anti-aging', name: 'Anti-Aging & Prevention', icon: '⏳' },
    { id: 'wellness', name: 'Wellness & Relaxation', icon: '🧘' },
    { id: 'inner-beauty', name: 'Inner Beauty Only', icon: '🌸', subtitle: 'Pure wellness retreat - no procedures' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          What treatments interest your group? *
        </h3>
        <p className="text-sm text-gray-600 mb-6">Select all that apply - each member can customize later</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {procedures.map(procedure => (
            <button
              key={procedure.id}
              onClick={() => onToggleProcedure(procedure.id)}
              className="p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg text-left"
              style={{
                borderColor: procedureFocus.includes(procedure.id) ? 'var(--bt-gold)' : '#e5e7eb',
                backgroundColor: procedureFocus.includes(procedure.id) ? '#fffef8' : 'white'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{procedure.icon}</span>
                <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                  {procedure.name}
                </span>
              </div>
              {procedure.subtitle && (
                <p className="text-sm text-gray-600 ml-12">{procedure.subtitle}</p>
              )}
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
          <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
            💡 Flexible Individual Choices
          </h4>
          <p className="text-sm text-gray-600">
            These selections help us curate the right specialists and experiences for your group. 
            Each member will customize their exact procedures when they join through their personal link.
          </p>
        </div>
      </div>
    </div>
  );
}
