import { MVideo, MVideoPlaylist } from '../../../types/models/index.js'
import { TagsHtml } from './tags-html.js'

export class CommonEmbedHtml {

  static buildEmptyEmbedHTML (options: {
    html: string
    playlist?: MVideoPlaylist
    video?: MVideo
  }) {
    const { html, playlist, video } = options

    let htmlResult = TagsHtml.addTitleTag(html)
    htmlResult = TagsHtml.addDescriptionTag(htmlResult)

    return TagsHtml.addTags(htmlResult, { indexationPolicy: 'never' }, { playlist, video })
  }
}
