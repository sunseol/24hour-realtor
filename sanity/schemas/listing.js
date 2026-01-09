export default {
  name: 'listing',
  title: '매물',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '매물명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: '유형',
      type: 'string',
      options: {
        list: [
          {title: '매매', value: '매매'},
          {title: '전세', value: '전세'},
          {title: '월세', value: '월세'},
        ],
      },
      initialValue: '매매',
    },
    {
      name: 'price',
      title: '가격',
      type: 'string',
      description: '예: 12억 5,000만 또는 300/80',
    },
    {
      name: 'specs',
      title: '규격',
      type: 'string',
      description: '예: 84㎡ · 3 bedroom · 2 bath',
    },
    {
      name: 'tags',
      title: '태그',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'mainImage',
      title: '메인 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gradientClass',
      title: '그라데이션 클래스',
      type: 'string',
      description: '예: from-slate-700 to-slate-900',
      options: {
        list: [
          {title: '슬레이트 다크', value: 'from-slate-700 to-slate-900'},
          {title: '슬레이트 미디엄', value: 'from-slate-600 to-slate-800'},
          {title: '슬레이트 라이트', value: 'from-slate-800 to-slate-950'},
        ],
      },
    },
  ],
}
