export default {
  name: 'companyInfo',
  title: '회사 정보',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: '회사명 (한글)',
      type: 'string',
      initialValue: '24시부동산',
    },
    {
      name: 'companyNameEn',
      title: '회사명 (영문)',
      type: 'string',
      initialValue: '24-HOUR REALTOR',
    },
    {
      name: 'phone',
      title: '전화번호',
      type: 'string',
      initialValue: '1588-0000',
    },
    {
      name: 'email',
      title: '이메일',
      type: 'string',
      initialValue: 'contact@24realtor.com',
    },
    {
      name: 'address',
      title: '주소',
      type: 'text',
      rows: 2,
      initialValue: '서울특별시 중구 을지로 281\nDDP (동대문디자인플라자)',
    },
    {
      name: 'businessHours',
      title: '운영시간',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', type: 'string', title: '요일'},
            {name: 'hours', type: 'string', title: '시간'},
          ],
        },
      ],
    },
  ],
}
