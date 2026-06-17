/**
 * Extract playback tokens from signed video playback info
 * @param playbackInfo - The video playback info
 * @returns The playback tokens or undefined if the response is not signed
 * @public
 * @example
 * const tokens = getPlaybackTokens(playbackInfo)
 * console.log(tokens)
 * ```json
 * {
 *    stream: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
 *    thumbnail: "eyJ0a2VuIjoiVGh1bWJuYWlsVG9rZW4tMTIz...",
 *    animated: "eyJ0a2VuIjoiQW5pbWF0ZWRUb2tlbi1kZWY...",
 *    storyboard: "eyJ0a2VuIjoiU3Rvcnlib2FyZFRva2VuLTc4..."
 * }
 * ```
 */
export declare function getPlaybackTokens(
  playbackInfo: VideoPlaybackInfo,
): VideoPlaybackTokens | undefined

/**
 * Check if the entire playback info response requires signed URLs
 * @public
 */
export declare function isSignedPlaybackInfo(
  playbackInfo: VideoPlaybackInfo,
): playbackInfo is VideoPlaybackInfoSigned

/** @public */
declare interface VideoPlaybackInfo<
  T extends VideoPlaybackInfoItem = VideoPlaybackInfoItem,
  R extends VideoRenditionInfo = T extends VideoPlaybackInfoItemSigned
    ? VideoRenditionInfoSigned
    : VideoRenditionInfo,
  S extends VideoSubtitleInfo = T extends VideoPlaybackInfoItemSigned
    ? VideoSubtitleInfoSigned
    : VideoSubtitleInfo,
> {
  id: string
  thumbnail: T
  animated: T
  storyboard: T
  stream: T
  duration: number
  aspectRatio: number
  renditions?: R[]
  subtitles?: S[]
}

/** @public */
declare type VideoPlaybackInfoItem = VideoPlaybackInfoItemPublic | VideoPlaybackInfoItemSigned

/** @public */
declare interface VideoPlaybackInfoItemPublic {
  url: string
}

/** @public */
declare interface VideoPlaybackInfoItemSigned extends VideoPlaybackInfoItemPublic {
  token: string
}

/** @public */
declare type VideoPlaybackInfoSigned = VideoPlaybackInfo<VideoPlaybackInfoItemSigned>

/** @public */
declare interface VideoPlaybackTokens {
  stream?: string
  thumbnail?: string
  storyboard?: string
  animated?: string
}

/** @public */
export declare type VideoRenditionInfo = VideoRenditionInfoPublic | VideoRenditionInfoSigned

/** @public */
export declare interface VideoRenditionInfoPublic {
  /** URL to the MP4 rendition (redirects to CDN) */
  url: string
  /** Resolution identifier, e.g. "1080p", "480p", "270p" */
  resolution: '1080p' | '480p' | '270p' | (string & {})
}

/** @public */
export declare interface VideoRenditionInfoSigned extends VideoRenditionInfoPublic {
  /** Authentication token for signed playback */
  token: string
  /** Token expiration time in ISO 8601 format */
  expiresAt: string
}

/** @public */
export declare type VideoSubtitleInfo = VideoSubtitleInfoPublic | VideoSubtitleInfoSigned

/** @public */
export declare interface VideoSubtitleInfoPublic {
  /** Subtitle track identifier */
  trackId: string
  /** ISO 639-1 language code */
  languageCode: string
  /** URL to the subtitle file */
  url: string
  /** Whether this track contains closed captions */
  closedCaptions: boolean
}

/** @public */
export declare interface VideoSubtitleInfoSigned extends VideoSubtitleInfoPublic {
  /** Authentication token for signed playback */
  token: string
  /** Token expiration time in ISO 8601 format */
  expiresAt: string
}

export {}
