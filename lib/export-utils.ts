import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Segment } from '@/hooks/useSegments';
import { CLOUDFRONT_URL } from './constants';

export interface ExportableVideo {
  url: string;
  filename: string;
  segmentName?: string;
}

/**
 * Downloads a single file from CloudFront URL
 */
export const downloadFile = async (url: string): Promise<Blob> => {
  // If the URL is relative, prepend the CloudFront URL
  const fullUrl = url.startsWith('http') ? url : `${CLOUDFRONT_URL}/${url}`;
  
  console.log('Downloading from URL:', fullUrl);
  
  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
  }
  
  return await response.blob();
};

/**
 * Creates a filename from URL or generates a default one
 */
export const generateFilename = (url: string, index: number, segmentName?: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split('.').pop() || 'mp4';
    
    if (segmentName) {
      return `${segmentName}_video_${index + 1}.${extension}`;
    }
    
    return `video_${index + 1}.${extension}`;
  } catch {
    const extension = 'mp4'; // Default extension
    if (segmentName) {
      return `${segmentName}_video_${index + 1}.${extension}`;
    }
    return `video_${index + 1}.${extension}`;
  }
};

/**
 * Extracts all non-template videos from segments
 */
export const extractVideosFromSegments = (segments: Segment[]): ExportableVideo[] => {
  const videos: ExportableVideo[] = [];
  
  console.log('Extracting videos from segments:', segments.length);
  
  segments.forEach((segment) => {
    console.log(`Segment ${segment.name} has ${segment.videos.length} videos`);
    
    // Add generated videos (exclude template videos)
    segment.videos.forEach((video, index) => {
      console.log(`Video ${index + 1} in ${segment.name}:`, video.s3Key);
      videos.push({
        url: video.s3Key,
        filename: generateFilename(video.s3Key, index, segment.name),
        segmentName: segment.name
      });
    });
  });
  
  console.log('Total videos to export:', videos.length);
  return videos;
};

/**
 * Extracts videos from a specific segment
 */
export const extractVideosFromSegment = (segment: Segment): ExportableVideo[] => {
  const videos: ExportableVideo[] = [];
  
  // Add generated videos (exclude template videos)
  segment.videos.forEach((video, index) => {
    videos.push({
      url: video.s3Key,
      filename: generateFilename(video.s3Key, index, segment.name),
      segmentName: segment.name
    });
  });
  
  return videos;
};

/**
 * Creates and downloads a ZIP file containing multiple videos
 */
export const createAndDownloadZip = async (
  videos: ExportableVideo[], 
  zipFilename: string,
  onProgress?: (progress: number, currentFile: string) => void
): Promise<void> => {
  if (videos.length === 0) {
    throw new Error('No videos to export');
  }

  const zip = new JSZip();
  
  console.log(`Creating ZIP file with ${videos.length} videos`);
  
  // Download all videos and add to zip
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    
    if (onProgress) {
      onProgress((i / videos.length) * 100, video.filename);
    }
    
    console.log(`Downloading video ${i + 1}/${videos.length}: ${video.filename}`);
    const blob = await downloadFile(video.url);
    zip.file(video.filename, blob);
    console.log(`Successfully added to ZIP: ${video.filename}`);
  }
  
  if (onProgress) {
    onProgress(100, 'Creating ZIP file...');
  }
  
  console.log('Generating ZIP file...');
  
  // Generate zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  console.log('ZIP file generated, starting download...');
  
  // Download the zip file
  saveAs(zipBlob, zipFilename);
  
  console.log('ZIP download initiated successfully!');
};

/**
 * Exports all videos from all segments as a ZIP file
 */
export const exportAllVideos = async (
  segments: Segment[],
  projectName?: string,
  onProgress?: (progress: number, currentFile: string) => void
): Promise<void> => {
  const videos = extractVideosFromSegments(segments);
  
  if (videos.length === 0) {
    throw new Error('No videos found to export');
  }
  
  const zipFilename = `${projectName || 'project'}_all_videos.zip`;
  await createAndDownloadZip(videos, zipFilename, onProgress);
};

/**
 * Exports videos from a specific segment as a ZIP file
 */
export const exportSegmentVideos = async (
  segment: Segment,
  projectName?: string,
  onProgress?: (progress: number, currentFile: string) => void
): Promise<void> => {
  const videos = extractVideosFromSegment(segment);
  
  if (videos.length === 0) {
    throw new Error(`No videos found in ${segment.name}`);
  }
  
  const zipFilename = `${projectName || 'project'}_${segment.name.toLowerCase().replace(/\s+/g, '_')}.zip`;
  await createAndDownloadZip(videos, zipFilename, onProgress);
};

/**
 * Utility to check if segments have any exportable videos
 */
export const hasExportableVideos = (segments: Segment[]): boolean => {
  return segments.some(segment => segment.videos.length > 0);
};

/**
 * Utility to get video count for segments
 */
export const getVideoCount = (segments: Segment[]): number => {
  return segments.reduce((total, segment) => total + segment.videos.length, 0);
};

/**
 * Utility to get video count for a specific segment
 */
export const getSegmentVideoCount = (segment: Segment): number => {
  return segment.videos.length;
};
