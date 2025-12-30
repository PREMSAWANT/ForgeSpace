/**
 * Utility helper functions
 */

/**
 * Format date to readable string
 * @param {Date|String} date
 * @returns {String}
 */
export function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  
  // Less than a minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  // Default format
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format distance to now (alias for formatDate for better naming)
 * @param {Date|String} date
 * @returns {String}
 */
export function formatDistanceToNow(date) {
  return formatDate(date);
}

/**
 * Get user initials for avatar
 * @param {String} name
 * @returns {String}
 */
export function getInitials(name) {
  if (!name) return '??';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Truncate text to specified length
 * @param {String} text
 * @param {Number} maxLength
 * @returns {String}
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate URL-friendly slug from text
 * @param {String} text
 * @returns {String}
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get status badge color
 * @param {String} status
 * @returns {String}
 */
export function getStatusColor(status) {
  const colors = {
    'active': 'bg-white text-black',
    'on-hold': 'bg-grey-border text-grey-soft',
    'completed': 'bg-grey-soft text-black',
    'archived': 'bg-grey-charcoal text-grey-muted'
  };
  
  return colors[status] || colors['active'];
}
