export default {
  name: 'listing',
  title: '매물',
  type: 'document',
  groups: [
    {name: 'basic', title: '기본 정보', default: true},
    {name: 'details', title: '상세 정보'},
    {name: 'media', title: '이미지'},
  ],
  fields: [
    {
      name: 'title',
      title: '매물명',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
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
      group: 'basic',
    },
    {
      name: 'price',
      title: '가격',
      type: 'string',
      description: '예: 12억 5,000만 또는 300/80',
      group: 'basic',
    },
    {
      name: 'address',
      title: '주소',
      type: 'string',
      description: '예: 서울시 강남구 삼성동',
      group: 'basic',
    },
    {
      name: 'tags',
      title: '태그',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: '예: 남향, 역세권, 신축',
      group: 'basic',
    },

    {
      name: 'specs',
      title: '규격',
      type: 'string',
      description: '예: 84㎡ · 3 bedroom · 2 bath',
      group: 'details',
    },
    {
      name: 'floor',
      title: '층수',
      type: 'string',
      description: '예: 15층/25층',
      group: 'details',
    },
    {
      name: 'built',
      title: '준공연도',
      type: 'string',
      description: '예: 2019년 또는 2020년 (2023년 리모델링)',
      group: 'details',
    },
    {
      name: 'description',
      title: '상세 설명',
      type: 'text',
      rows: 4,
      description: '매물에 대한 상세 설명을 입력하세요',
      group: 'details',
    },
    {
      name: 'features',
      title: '시설 및 특징',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: '예: 주차가능, 엘리베이터, 보안시스템, 헬스장',
      group: 'details',
    },

    {
      name: 'mainImage',
      title: '메인 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: '목록에서 보여지는 대표 이미지',
      group: 'media',
    },
    {
      name: 'images',
      title: '갤러리 이미지',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: '상세 페이지에서 보여지는 추가 이미지들',
      group: 'media',
    },
    {
      name: 'gradientClass',
      title: '이미지 없을 때 배경색',
      type: 'string',
      description: '이미지가 없을 경우 표시되는 그라데이션 색상',
      options: {
        list: [
          {title: '슬레이트 다크', value: 'from-slate-700 to-slate-900'},
          {title: '슬레이트 미디엄', value: 'from-slate-600 to-slate-800'},
          {title: '슬레이트 라이트', value: 'from-slate-800 to-slate-950'},
          {title: '인디고', value: 'from-indigo-700 to-indigo-900'},
          {title: '로즈', value: 'from-rose-600 to-rose-800'},
          {title: '바이올렛', value: 'from-violet-700 to-violet-900'},
        ],
      },
      group: 'media',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      price: 'price',
      media: 'mainImage',
    },
    prepare({title, type, price, media}) {
      return {
        title: title,
        subtitle: `${type || ''} ${price || ''}`.trim(),
        media: media,
      }
    },
  },
}
