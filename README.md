## Project Summary

Smart Bookmark App is a full-stack web application built with Next.js (App Router) and Supabase. It allows users to log in using Google OAuth, add and delete personal bookmarks, and view real-time updates across multiple tabs. Each user's data is securely isolated using Row Level Security (RLS), ensuring bookmarks remain private.

## Challenges & Solutions

**1. Environment Variables Not Loading**  
I encountered a `supabaseUrl is required` error because the `.env.local` file was placed in the wrong directory, and the variable names didn’t match the expected keys. I resolved this by moving the file to the project root, correcting the variable names, and restarting the development server.

**2. Google OAuth Not Enabled**  
Login initially failed with an “Unsupported provider” error. The issue was that Google OAuth had not been configured in Supabase. I created OAuth credentials in Google Cloud, added the correct redirect URI, and connected the client ID and secret in Supabase.

**3. Realtime Not Updating Across Tabs**  
The application did not sync between two open tabs. I discovered that the `bookmarks` table was not added to the `supabase_realtime` publication. After adding it under Database → Publications, real-time updates worked correctly.

**4. UI Contrast & Layout Issues**  
The interface initially looked washed out, and the login appeared in multiple places. I improved contrast by using a clearer colour hierarchy and simplified the layout so that login appears only in the centre when logged out, and user controls appear in the navbar after authentication.
