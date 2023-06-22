import { Route, Routes } from 'react-router-dom';
import {
  AlbumPage,
  AlbumsPage,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  TestPage,
  TrackPage,
  TracksPage,
} from '../pages';

function Router() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/album/:id" element={<AlbumPage />} />
      <Route path="/albums" element={<AlbumsPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/track/:id" element={<TrackPage />} />
      <Route path="/test/" element={<TestPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
