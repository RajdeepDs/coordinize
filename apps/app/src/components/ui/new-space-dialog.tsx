import { Button } from "@coordinize/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coordinize/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@coordinize/ui/components/sidebar";
import { Textarea } from "@coordinize/ui/components/textarea";
import { Icons } from "@coordinize/ui/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name for your space.",
  }),
  about: z.string(),
});

export function NewSpaceDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.plus />
            <span>New space</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="top-[30%] flex flex-col gap-6 p-0 [&>button:last-child]:top-3.5 [&>button:last-child]:focus:ring-0">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-4 py-3 font-medium text-sm">
            Create new space
          </DialogTitle>
          <DialogDescription className="sr-only">
            Create a new space to manage posts.
          </DialogDescription>
        </DialogHeader>
        <div className="px-4">
          <Form {...form}>
            <form className="space-y-4">
              {/* Add icon field */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        aria-label="Name"
                        autoComplete="off"
                        placeholder="Engineering"
                        className="shadow-none dark:bg-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                name="about"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">About</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write something about..."
                        className="shadow-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="border-t px-4 py-2">
          <DialogClose asChild>
            <Button size={"sm"} variant={"secondary"} className="font-normal">
              Close
            </Button>
          </DialogClose>
          <Button
            size={"sm"}
            variant={"default"}
            type="submit"
            className="font-normal"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create space
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
