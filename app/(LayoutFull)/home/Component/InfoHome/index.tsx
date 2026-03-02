import { ClassIcon } from '@/components/Icons/Class'
import { SettingIcon } from '@/components/Icons/Setting'
import { UserCircleIcon } from '@/components/Icons/UserCircle'

const InfoHome = () => {
  return (
    <div id='why' className='flex flex-col gap-10'>
      <div className='text-center'>
        <h2 className='text-2xl font-extrabold sm:text-3xl'>Tại sao chọn thầy Hồng?</h2>
        <p className='mt-2 text-sm text-white/60 sm:text-base'>Phương pháp giảng dạy khoa học, tận tâm với từng học sinh</p>
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
        {[
          {
            title: 'Luyện chữ đẹp',
            desc: 'Rèn luyện nét chữ nết người, phương pháp khoa học',
            icon: ClassIcon,
          },
          {
            title: 'Toán tư duy',
            desc: 'Phát triển khả năng logic và sáng tạo cho trẻ',
            icon: SettingIcon,
          },
          {
            title: 'Tận tâm',
            desc: 'Mỗi học sinh được quan tâm và hướng dẫn riêng',
            icon: UserCircleIcon,
          },
        ].map((it) => {
          const Icon = it.icon
          return (
            <div
              key={it.title}
              className='rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur'
              data-aos='zoom-in'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-default/20 text-default'>
                <Icon className='size-6' />
              </div>
              <div className='mt-4 font-semibold'>{it.title}</div>
              <div className='mt-2 text-sm text-white/60'>{it.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InfoHome
