'use client';

// import { useSession } from 'next-auth/react';

export function EditProfille() {
  // const { data: session } = useSession();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     name: session?.user?.name,
  //     email: session?.user?.email,
  //   },
  // });

  // return (
  //   <Stack
  //     flexDirection={{ xs: 'column', sm: 'row' }}
  //     gap={2}
  //     component="form"
  //     onSubmit={handleSubmit((data) => console.log(data))}
  //   >
  //     {/* <Box
  //       sx={{ position: 'relative', maxWidth: '100%', alignSelf: 'center' }}
  //       width={{ xs: 150, sm: 200, md: 250 }}
  //       height={{ xs: 150, sm: 200, md: 250 }}
  //     >
  //       {session?.user?.image && (
  //         <Image
  //           src={session.user.image}
  //           alt="user avatar"
  //           fill
  //           unoptimized={
  //             new URL(session.user.image).origin !==
  //             process.env.NEXT_PUBLIC_S3_URL
  //           }
  //         />
  //       )}
  //     </Box> */}
  //     <Stack gap={2} width={{ xs: '100%', sm: 300, md: 500 }}>
  //       <TextField {...register('name')} label="Отображаемое имя" />
  //       <TextField {...register('email')} label="Адрес эл. почты" />
  //       <Button type="submit" sx={{ mt: 'auto' }}>
  //         Изменить профиль
  //       </Button>
  //     </Stack>
  //   </Stack>
  // );
  return <div></div>;
}
