import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('콘텐츠')
    .items(S.documentTypeListItems())
