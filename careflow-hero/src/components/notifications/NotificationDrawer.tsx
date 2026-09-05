import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck, Trash2 } from 'lucide-react';
import { NotificationItemCard } from './NotificationItemCard';
import type { CareFlowNotification } from './data/mockNotificationsData';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: CareFlowNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onActionClick: (notification: CareFlowNotification) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onActionClick,
}) => {
  const [filterTab, setFilterTab] = useState<'All' | 'Unread' | 'Appointments' | 'Medications'>('All');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filterTab === 'Unread') return !n.isRead;
    if (filterTab === 'Appointments') return n.category === 'Appointments' || n.category === 'Queue';
    if (filterTab === 'Medications') return n.category === 'Medications' || n.category === 'Records';
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Slide-over Right Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-screen w-full sm:w-[420px] bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border-color)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-[var(--text-primary)]">
                      Notification Center
                    </h3>
                    <span className="text-xs text-[var(--text-secondary)]">
                      Real-time clinical alerts & updates
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm">
                    {unreadCount} Unread
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-item-hover)] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Mark All Read & Clear */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={onMarkAllAsRead}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  <span>Mark All as Read</span>
                </button>

                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-[var(--text-muted)] hover:text-rose-500 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-card-bg)] border border-[var(--border-subtle)]">
                {(['All', 'Unread', 'Appointments', 'Medications'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilterTab(tab)}
                    className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      filterTab === tab
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center space-y-2 text-[var(--text-muted)] my-auto">
                  <Bell className="h-8 w-8 mx-auto opacity-50" />
                  <p className="text-xs font-semibold">No notifications in this view.</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <NotificationItemCard
                    key={notif.id}
                    notification={notif}
                    onActionClick={onActionClick}
                    onMarkAsRead={onMarkAsRead}
                  />
                ))
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card-bg)] text-center">
              <span className="text-[11px] text-[var(--text-muted)] font-semibold">
                CareFlow Proactive Clinical Engine • Encrypted Notifications
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
