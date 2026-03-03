"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Authenticate admin
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/contact?key=${encodeURIComponent(adminKey)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      setMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Refresh messages
  const refreshMessages = async () => {
    if (!adminKey) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/contact?key=${encodeURIComponent(adminKey)}`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to refresh messages:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm shadow-xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-2 text-center"
            >
              Admin Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-center mb-8"
            >
              Enter your admin key to view messages
            </motion.p>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label htmlFor="adminKey" className="block text-sm font-medium mb-2">
                  Admin Key
                </label>
                <input
                  type="password"
                  id="adminKey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter admin key"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" fullWidth isLoading={loading}>
                Access Dashboard
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">Messages Dashboard</h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={refreshMessages}
                disabled={loading}
              >
                Refresh
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-card border border-border rounded-xl"
            >
              <div className="text-3xl font-bold text-primary">{messages.length}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-card border border-border rounded-xl"
            >
              <div className="text-3xl font-bold text-blue-500">
                {messages.filter(m => !m.read).length}
              </div>
              <div className="text-sm text-muted-foreground">Unread Messages</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-card border border-border rounded-xl"
            >
              <div className="text-3xl font-bold text-green-500">
                {messages.filter(m => m.read).length}
              </div>
              <div className="text-sm text-muted-foreground">Read Messages</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 mb-6"
        >
          {(['all', 'unread', 'read'] as const).map((filterOption) => (
            <motion.button
              key={filterOption}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:bg-secondary'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMessages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-muted-foreground"
            >
              No messages found
            </motion.div>
          ) : (
            filteredMessages.map((msg, index) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedMessage(msg)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  msg.read
                    ? 'bg-card border-border'
                    : 'bg-primary/5 border-primary/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{msg.name}</h3>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                  </div>
                  {!msg.read && (
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      New
                    </span>
                  )}
                </div>
                <h4 className="font-medium mb-2">{msg.subject}</h4>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {msg.message}
                </p>
                <div className="text-xs text-muted-foreground">
                  {formatDate(msg.createdAt)}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail Modal */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">From</label>
                    <p className="font-semibold">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-semibold">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Subject</label>
                    <p className="font-semibold">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Date</label>
                    <p className="font-semibold">{formatDate(selectedMessage.createdAt)}</p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Message</label>
                    <p className="mt-2 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                    }}
                  >
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
