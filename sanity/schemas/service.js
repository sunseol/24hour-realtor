export default {
  name: 'service',
  title: '서비스',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '서비스명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: '설명',
      type: 'text',
      rows: 3,
    },
    {
      name: 'icon',
      title: '아이콘',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'colorClass',
      title: '색상 클래스',
      type: 'string',
      description: '예: from-blue-600 to-blue-800',
      options: {
        list: [
          {title: '블루', value: 'from-blue-600 to-blue-800'},
          {title: '엠버', value: 'from-amber-600 to-amber-800'},
          {title: '에메랄드', value: 'from-emerald-600 to-emerald-800'},
          {title: '퍼플', value: 'from-purple-600 to-purple-800'},
        ],
      },
    },
    {
      name: 'order',
      title: '정렬 순서',
      type: 'number',
      initialValue: 0,
    },
  ],
}
