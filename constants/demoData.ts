import { COMMENT_STATUS, BLOG_STATUS } from './app'

import { IBlog } from '@/services/API/Blog/type'
import { IClass } from '@/services/API/Class/type'
import { IComment } from '@/services/API/Comment/type'

/**
 * Seed content shown when the backend has no data yet, so the public site never
 * renders an empty page. Hooks fall back to these only when the API returns nothing.
 */

export const DEMO_CLASS_IMAGES = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
  'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80',
]

export type DemoClass = IClass & {
  _id: string
  slug?: string
  image?: string
  ageRange?: string
  description?: string
  program?: string[]
  outcome?: string[]
  schedule?: string
}

export const DEMO_CLASSES: DemoClass[] = [
  {
    _id: 'demo-luyen-chu',
    name: 'Luyện chữ đẹp',
    price: 450000,
    numberStudent: 12,
    ageRange: '5 - 9 tuổi',
    schedule: 'Thứ 2 - 4 - 6',
    image: DEMO_CLASS_IMAGES[0],
    note: 'Rèn nét chữ chuẩn, tư thế ngồi và thói quen viết đúng ngay từ đầu.',
    description:
      'Lớp luyện chữ đẹp giúp con làm quen với từng nét cơ bản, viết đúng ly, đúng khoảng cách và giữ được tư thế ngồi chuẩn. Thầy sửa tay cho từng bạn trong mỗi buổi học.',
    program: ['Nét cơ bản và tư thế cầm bút', 'Chữ thường — chữ hoa theo mẫu', 'Viết đoạn, canh dòng và trình bày vở', 'Luyện tốc độ viết'],
    outcome: ['Chữ viết đều nét, đúng ly', 'Giữ vở sạch, trình bày gọn', 'Viết nhanh hơn mà không xấu chữ'],
    attributes: { time: '17:30 - 19:00' },
  },
  {
    _id: 'demo-toan-tu-duy',
    name: 'Toán tư duy',
    price: 550000,
    numberStudent: 12,
    ageRange: '6 - 11 tuổi',
    schedule: 'Thứ 3 - 5 - 7',
    image: DEMO_CLASS_IMAGES[1],
    note: 'Học toán bằng tư duy và trò chơi, không học vẹt công thức.',
    description:
      'Thay vì học thuộc công thức, con được dẫn dắt để tự tìm ra cách giải. Mỗi buổi đều có bài toán tình huống gắn với đời sống để con thấy toán gần gũi.',
    program: ['Tư duy logic và quy luật', 'Toán đố và sơ đồ đoạn thẳng', 'Hình học trực quan', 'Giải toán nhiều cách'],
    outcome: ['Tự phân tích đề bài', 'Trình bày lời giải mạch lạc', 'Tự tin hơn với môn Toán ở trường'],
    attributes: { time: '17:30 - 19:00' },
  },
  {
    _id: 'demo-soroban',
    name: 'Toán Soroban',
    price: 600000,
    numberStudent: 10,
    ageRange: '6 - 12 tuổi',
    schedule: 'Thứ 2 - 4 - 6',
    image: DEMO_CLASS_IMAGES[2],
    note: 'Tính nhẩm bằng bàn tính Soroban, rèn tập trung và trí nhớ hình ảnh.',
    description:
      'Soroban giúp con hình dung con số trong đầu và tính nhẩm nhanh. Bên cạnh tốc độ tính, lớp còn rèn khả năng tập trung và ghi nhớ hình ảnh cho con.',
    program: ['Làm quen bàn tính', 'Cộng trừ trên bàn tính', 'Tính nhẩm tưởng tượng', 'Nhân chia cơ bản'],
    outcome: ['Tính nhẩm nhanh hơn bạn cùng lứa', 'Tập trung lâu hơn khi học', 'Trí nhớ hình ảnh tốt hơn'],
    attributes: { time: '19:00 - 20:30' },
  },
  {
    _id: 'demo-tap-viet',
    name: 'Tập viết tiền tiểu học',
    price: 400000,
    numberStudent: 12,
    ageRange: '5 - 6 tuổi',
    schedule: 'Thứ 3 - 5',
    image: DEMO_CLASS_IMAGES[3],
    note: 'Chuẩn bị cho con vào lớp 1 nhẹ nhàng, không áp lực.',
    description: 'Lớp dành cho các bé chuẩn bị vào lớp 1: nhận mặt chữ, mặt số, cầm bút đúng và ngồi học đủ 45 phút mà không mệt.',
    program: ['Nhận mặt chữ cái và chữ số', 'Tô nét, viết nét cơ bản', 'Đếm và so sánh số', 'Nề nếp lớp học'],
    outcome: ['Vào lớp 1 không bỡ ngỡ', 'Cầm bút đúng ngay từ đầu', 'Ngồi học tập trung 45 phút'],
    attributes: { time: '16:00 - 17:15' },
  },
  {
    _id: 'demo-tin-hoc',
    name: 'Tin học cho trẻ',
    price: 500000,
    numberStudent: 10,
    ageRange: '8 - 12 tuổi',
    schedule: 'Thứ 7 - Chủ nhật',
    image: DEMO_CLASS_IMAGES[4],
    note: 'Gõ phím mười ngón, Word, PowerPoint và lập trình Scratch.',
    description:
      'Con học dùng máy tính một cách có ích: gõ phím đúng, soạn thảo văn bản, làm bài thuyết trình và bước đầu làm quen lập trình Scratch.',
    program: ['Gõ phím mười ngón', 'Word và PowerPoint cơ bản', 'An toàn trên Internet', 'Lập trình Scratch'],
    outcome: ['Gõ phím không nhìn bàn phím', 'Tự làm bài thuyết trình', 'Tạo được game nhỏ với Scratch'],
    attributes: { time: '08:00 - 09:30' },
  },
  {
    _id: 'demo-on-thi',
    name: 'Ôn tập Toán tiểu học',
    price: 520000,
    numberStudent: 12,
    ageRange: '8 - 11 tuổi',
    schedule: 'Thứ 2 - 4 - 6',
    image: DEMO_CLASS_IMAGES[5],
    note: 'Bám sát chương trình trên lớp, lấp lỗ hổng kiến thức.',
    description: 'Lớp ôn tập theo đúng tiến độ chương trình của con ở trường, phát hiện và lấp những lỗ hổng kiến thức trước khi kiểm tra.',
    program: ['Hệ thống lại kiến thức theo tuần', 'Chữa bài tập về nhà', 'Luyện đề kiểm tra', 'Bổ sung phần còn yếu'],
    outcome: ['Theo kịp bài trên lớp', 'Điểm kiểm tra cải thiện rõ', 'Tự học có phương pháp'],
    attributes: { time: '19:00 - 20:30' },
  },
]

export const DEMO_COMMENTS: IComment[] = [
  {
    _id: 'demo-cmt-1',
    name: 'Chị Nguyễn Thu Hà',
    rating: 5,
    className: 'Luyện chữ đẹp',
    status: COMMENT_STATUS.APPROVED,
    createdAt: '2026-10-02T09:00:00.000Z',
    content:
      'Bé nhà mình trước viết rất xấu và ngại viết. Học thầy được 3 tháng thì chữ đều hẳn, quan trọng là con chịu ngồi vào bàn học mà không phải nhắc.',
    replies: [
      {
        _id: 'demo-rep-1',
        name: 'Thầy Hồng',
        isTeacher: true,
        createdAt: '2026-10-02T14:20:00.000Z',
        content: 'Cảm ơn chị đã tin tưởng. Bé rất chịu khó, thầy sẽ tiếp tục rèn thêm phần tốc độ viết cho con ạ.',
      },
    ],
  },
  {
    _id: 'demo-cmt-2',
    name: 'Anh Trần Minh Quân',
    rating: 5,
    className: 'Toán Soroban',
    status: COMMENT_STATUS.APPROVED,
    createdAt: '2026-09-18T10:30:00.000Z',
    content: 'Con mình tính nhẩm nhanh hơn hẳn, mà cái được nhất là con tập trung lâu hơn. Thầy nhiệt tình, hay nhắn tin báo tình hình học của con.',
    replies: [],
  },
  {
    _id: 'demo-cmt-3',
    name: 'Chị Lê Thị Bích',
    rating: 5,
    className: 'Toán tư duy',
    status: COMMENT_STATUS.APPROVED,
    createdAt: '2026-09-05T16:45:00.000Z',
    content: 'Lớp ít học sinh nên thầy kèm được từng bé. Con mình hay hỏi lại bài mà thầy vẫn kiên nhẫn giảng, không gắt bao giờ.',
    replies: [
      {
        _id: 'demo-rep-2',
        name: 'Thầy Hồng',
        isTeacher: true,
        createdAt: '2026-09-06T08:10:00.000Z',
        content: 'Con hỏi là con đang suy nghĩ, đó là điều tốt chị ạ. Mong chị tiếp tục đồng hành cùng thầy.',
      },
    ],
  },
  {
    _id: 'demo-cmt-4',
    name: 'Chị Phạm Ngọc Linh',
    rating: 4,
    className: 'Tập viết tiền tiểu học',
    status: COMMENT_STATUS.APPROVED,
    createdAt: '2026-08-21T19:00:00.000Z',
    content: 'Bé chuẩn bị vào lớp 1, học ở đây xong vào trường không bị bỡ ngỡ. Chỉ mong thầy mở thêm ca cuối tuần cho các bé bận học ở trường.',
    replies: [],
  },
  {
    _id: 'demo-cmt-5',
    name: 'Anh Võ Thanh Tùng',
    rating: 5,
    className: 'Ôn tập Toán tiểu học',
    status: COMMENT_STATUS.APPROVED,
    createdAt: '2026-08-02T11:15:00.000Z',
    content: 'Điểm Toán của con từ 6 lên 9 sau một học kỳ. Học phí rõ ràng, có biên lai đầy đủ nên mình rất yên tâm.',
    replies: [],
  },
]

export const DEMO_BLOGS: IBlog[] = [
  {
    _id: 'demo-blog-1',
    slug: '5-cach-giup-con-ngoi-vao-ban-hoc-ma-khong-can-quat',
    title: '5 cách giúp con ngồi vào bàn học mà không cần quát',
    description: 'Ép con học bằng tiếng quát chỉ hiệu quả trong vài phút. Đây là 5 cách thầy đã thử và thấy hiệu quả với các bé 5–10 tuổi.',
    thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    author: 'Thầy Hồng',
    tags: ['Đồng hành cùng con'],
    readTime: 6,
    status: BLOG_STATUS.PUBLISHED,
    createdAt: '2026-10-20T08:00:00.000Z',
    content:
      'Nhiều phụ huynh nhắn cho thầy rằng tối nào cũng phải quát con mới chịu học. Thực ra vấn đề thường không nằm ở việc con lười, mà ở chỗ con chưa biết bắt đầu từ đâu.\n\n**1. Cố định một khung giờ.** Não trẻ thích sự lặp lại. Khi giờ học cố định, con sẽ tự vào guồng mà không cần nhắc.\n\n**2. Bắt đầu bằng việc dễ nhất.** Cho con làm bài dễ trước để có cảm giác "mình làm được", rồi mới tới bài khó.\n\n**3. Chia nhỏ thời gian.** Với bé 6–8 tuổi, 20 phút tập trung rồi nghỉ 5 phút tốt hơn ngồi lì một tiếng.\n\n**4. Ngồi cạnh con, nhưng đừng làm hộ.** Sự có mặt của bố mẹ đã là một động lực lớn.\n\n**5. Khen quá trình, đừng chỉ khen điểm.** "Hôm nay con ngồi học nghiêm túc lắm" có giá trị hơn "con được 10 điểm giỏi quá".',
  },
  {
    _id: 'demo-blog-2',
    slug: 'luyen-chu-dep-nen-bat-dau-tu-may-tuoi',
    title: 'Luyện chữ đẹp nên bắt đầu từ mấy tuổi?',
    description: 'Bắt đầu quá sớm con mỏi tay, quá muộn thì khó sửa. Thầy chia sẻ mốc thời gian hợp lý và dấu hiệu con đã sẵn sàng.',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    author: 'Thầy Hồng',
    tags: ['Luyện chữ'],
    readTime: 5,
    status: BLOG_STATUS.PUBLISHED,
    createdAt: '2026-10-05T08:00:00.000Z',
    content:
      'Câu hỏi thầy nhận nhiều nhất từ phụ huynh là "con mấy tuổi thì luyện chữ được?".\n\n**Khoảng 5 tuổi là hợp lý.** Lúc này cơ tay của con đã đủ khỏe để cầm bút trong 20–30 phút mà không mỏi.\n\n**Dấu hiệu con đã sẵn sàng:** con cầm bút bằng ba ngón thay vì nắm cả bàn tay, tô được trong khung hình, ngồi yên được 15 phút.\n\n**Nếu con đã học lớp 2–3 mà chữ xấu thì sao?** Vẫn sửa được, chỉ là mất thời gian hơn vì phải bỏ thói quen cũ. Thường cần 2–3 tháng kiên trì.\n\nĐiều quan trọng nhất: đừng so sánh chữ của con với bạn khác. Mỗi bé có tốc độ phát triển cơ tay riêng.',
  },
  {
    _id: 'demo-blog-3',
    slug: 'soroban-co-thuc-su-giup-con-hoc-toan-tot-hon-khong',
    title: 'Soroban có thực sự giúp con học Toán tốt hơn không?',
    description: 'Một góc nhìn thẳng thắn từ người dạy: Soroban mạnh ở đâu, và những kỳ vọng nào là không thực tế.',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    author: 'Thầy Hồng',
    tags: ['Toán tư duy'],
    readTime: 7,
    status: BLOG_STATUS.PUBLISHED,
    createdAt: '2026-09-12T08:00:00.000Z',
    content:
      'Thầy sẽ nói thẳng: Soroban không phải phép màu biến con thành thần đồng.\n\n**Soroban mạnh ở:** tốc độ tính nhẩm cộng trừ, khả năng tập trung, và trí nhớ hình ảnh. Sau 6 tháng, phần lớn các bé tính nhẩm nhanh hơn rõ rệt.\n\n**Soroban không thay thế được:** tư duy giải toán đố, hình học, hay khả năng đọc hiểu đề bài. Đây là lý do thầy luôn khuyên phụ huynh học Soroban song song với Toán tư duy.\n\n**Con nên học bao lâu?** Tối thiểu 6 tháng mới thấy kết quả rõ. Học 2–3 tháng rồi bỏ thì gần như không đọng lại gì.',
  },
  {
    _id: 'demo-blog-4',
    slug: 'chuan-bi-gi-cho-con-truoc-khi-vao-lop-1',
    title: 'Chuẩn bị gì cho con trước khi vào lớp 1?',
    description: 'Không phải dạy trước chương trình. Đây là 4 thứ quan trọng hơn mà nhiều phụ huynh bỏ qua.',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
    author: 'Thầy Hồng',
    tags: ['Tiền tiểu học'],
    readTime: 5,
    status: BLOG_STATUS.PUBLISHED,
    createdAt: '2026-08-28T08:00:00.000Z',
    content:
      'Nhiều phụ huynh lo lắng nên cho con học trước hết chương trình lớp 1. Thầy nghĩ điều đó không cần thiết, thậm chí có hại vì vào lớp con sẽ chán.\n\n**1. Nề nếp.** Con ngồi yên được 35–40 phút, biết giơ tay xin phép, biết tự cất đồ dùng.\n\n**2. Cầm bút đúng.** Thói quen cầm bút sai rất khó sửa về sau.\n\n**3. Nhận mặt chữ và số.** Chỉ cần nhận biết, chưa cần viết thành thạo.\n\n**4. Tự phục vụ.** Tự đi vệ sinh, tự uống nước, tự mở hộp sữa. Nghe nhỏ nhưng ảnh hưởng lớn tới sự tự tin của con.',
  },
]

export const DEMO_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', caption: 'Giờ học Toán tư duy' },
  { src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80', caption: 'Lớp luyện chữ buổi chiều' },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', caption: 'Thực hành bàn tính Soroban' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', caption: 'Góc trưng bày vở sạch chữ đẹp' },
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', caption: 'Thư viện nhỏ của lớp' },
  { src: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80', caption: 'Buổi tổng kết cuối khóa' },
  { src: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=80', caption: 'Giờ tự học có thầy kèm' },
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', caption: 'Hoạt động nhóm' },
]

export const DEMO_ACHIEVEMENTS = [
  { value: '500+', labelKey: 'home.statStudent' },
  { value: '10+', labelKey: 'home.statYear' },
  { value: '98%', labelKey: 'home.statParent' },
  { value: '6', labelKey: 'home.statClass' },
] as const
