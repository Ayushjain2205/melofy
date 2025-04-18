"use client"

import React from 'react';

interface Activity {
  id: string
  trader: string
  type: 'Buy' | 'Sale'
  amount: number
  date: string
}

// This would normally come from an API
const getActivityData = (songId: string): Activity[] => {
  // Using songId in the seed to make it deterministic for each song
  const seed = parseInt(songId.replace(/\D/g, '') || '0')
  return Array.from({ length: 10 }, (_, i) => ({
    id: `activity-${i}`,
    trader: `0x${(seed + i).toString(16).padEnd(6, '0')}...${(seed + i + 1).toString(16).padEnd(4, '0')}`,
    type: ((seed + i) % 3 === 0) ? 'Buy' : 'Sale',
    amount: (seed + i) % 1000,
    date: new Date(Date.now() - i * 3600000).toISOString()
  }))
}

export function ActivityFeed({ songId }: { songId: string }) {
  const activities = React.useMemo(() => getActivityData(songId), [songId])

  return (
    <div className="bg-[#1A1522] border border-[#FF00FF]/20 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-[#00FFFF] font-audiowide">Activity</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-4 text-sm text-[#FF99D1] font-exo2">
          <div>Trader</div>
          <div>Type</div>
          <div>USD</div>
          <div>Date</div>
        </div>
        {activities.map((activity) => (
          <div key={activity.id} className="grid grid-cols-4 text-sm border-t border-zinc-800 py-2">
            <div className="font-mono text-[#00FFFF]">{activity.trader}</div>
            <div className={activity.type === 'Buy' ? 'text-[#00FFFF]' : 'text-[#FF0000]'}>
              {activity.type}
            </div>
            <div className="font-mono text-white">
              ${activity.amount.toFixed(2)}
            </div>
            <div className="text-[#FF99D1]">
              {new Date(activity.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
