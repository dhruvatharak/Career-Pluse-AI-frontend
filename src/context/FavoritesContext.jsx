/**
 * CareerPulse AI - Favorites Context & Provider
 * Manages global bookmark state with optimistic updates and live synchronization.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchFavorites, addFavoriteAPI, removeFavoriteAPI } from '../api/favorite.api.js';
import { useAuth } from './AuthContext.jsx';
import toast from 'react-hot-toast';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [favoritesData, setFavoritesData] = useState({
    raw: [],
    groups: [],
    schools: [],
    colleges: [],
    diplomas: [],
    degreeColleges: []
  });
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoritesData({ raw: [], groups: [], schools: [], colleges: [], diplomas: [], degreeColleges: [] });
      return;
    }

    try {
      setLoading(true);
      const res = await fetchFavorites();
      if (res?.data) {
        setFavoritesData({
          raw: res.data.raw || [],
          groups: res.data.groups || [],
          schools: res.data.schools || [],
          colleges: res.data.colleges || [],
          diplomas: res.data.diplomas || [],
          degreeColleges: res.data.degreeColleges || []
        });
      }
    } catch (err) {
      console.warn('[Favorites] Error loading bookmarks:', err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorite = useCallback(
    (itemType, itemId) => {
      if (!itemId || !favoritesData.raw) return false;
      return favoritesData.raw.some(
        (f) => f.itemType === itemType && f.itemId === itemId
      );
    },
    [favoritesData]
  );

  const toggleFavorite = useCallback(
    async (itemType, itemId, itemObject = null) => {
      if (!isAuthenticated) {
        toast.error('Please sign in to save favorites');
        return false;
      }

      const currentlyFav = isFavorite(itemType, itemId);

      // Optimistic update
      setFavoritesData((prev) => {
        if (currentlyFav) {
          return {
            ...prev,
            raw: prev.raw.filter((f) => !(f.itemType === itemType && f.itemId === itemId)),
            groups: itemType === 'group' ? prev.groups.filter((g) => g.groupId !== itemId) : prev.groups,
            schools: itemType === 'school' ? prev.schools.filter((s) => s.schoolId !== itemId) : prev.schools,
            diplomas: itemType === 'diploma' ? prev.diplomas.filter((d) => d.courseId !== itemId) : prev.diplomas,
            colleges: itemType === 'college' ? prev.colleges.filter((c) => c.collegeId !== itemId) : prev.colleges,
            degreeColleges: itemType === 'degreeCollege' ? prev.degreeColleges.filter((c) => c.collegeId !== itemId) : prev.degreeColleges
          };
        } else {
          const newRaw = [...prev.raw, { itemType, itemId, createdAt: new Date().toISOString() }];
          return {
            ...prev,
            raw: newRaw,
            groups: itemType === 'group' && itemObject ? [...prev.groups, itemObject] : prev.groups,
            schools: itemType === 'school' && itemObject ? [...prev.schools, itemObject] : prev.schools,
            diplomas: itemType === 'diploma' && itemObject ? [...prev.diplomas, itemObject] : prev.diplomas,
            colleges: itemType === 'college' && itemObject ? [...prev.colleges, itemObject] : prev.colleges,
            degreeColleges: itemType === 'degreeCollege' && itemObject ? [...prev.degreeColleges, itemObject] : prev.degreeColleges
          };
        }
      });

      try {
        if (currentlyFav) {
          await removeFavoriteAPI(itemType, itemId);
          toast.success('Removed from favorites', { icon: '🤍' });
        } else {
          await addFavoriteAPI(itemType, itemId);
          toast.success('Saved to your favorites', { icon: '❤️' });
        }
        // Background sync to ensure full item data consistency
        loadFavorites();
        return true;
      } catch (err) {
        // Rollback on failure
        toast.error(err.message || 'Could not update favorite');
        loadFavorites();
        return false;
      }
    },
    [isAuthenticated, isFavorite, loadFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoritesData,
        loading,
        isFavorite,
        toggleFavorite,
        refetchFavorites: loadFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
