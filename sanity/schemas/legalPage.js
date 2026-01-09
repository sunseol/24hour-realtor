import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'legalPage',
  title: '법적 페이지',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: '페이지 유형',
      type: 'string',
      options: {
        list: [
          {title: '개인정보처리방침', value: 'privacy'},
          {title: '이용약관', value: 'terms'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lastUpdated',
      title: '최종 수정일',
      type: 'date'
    }),
    defineField({
      name: 'content',
      title: '내용',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: '본문', value: 'normal'},
            {title: '제목 2', value: 'h2'},
            {title: '제목 3', value: 'h3'},
            {title: '제목 4', value: 'h4'}
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'}
            ]
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType'
    },
    prepare({title, pageType}) {
      const typeLabel = pageType === 'privacy' ? '개인정보처리방침' : '이용약관'
      return {
        title: title || typeLabel,
        subtitle: typeLabel
      }
    }
  }
})
