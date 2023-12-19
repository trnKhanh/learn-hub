import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2 } from "lucide-react";
import { DashboardSectionButton } from "../../../_components/dashboard-section";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createSupporter } from "@/actions/supporters";
import { toast } from "react-toastify";

interface CreateSupporterDialogProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
}

export const CreateSupporterDialog = ({
  isCreating,
  setIsCreating
}: CreateSupporterDialogProps) => {
  const supporterSchema = z.object({
    username: z.string(),
    role: z.enum(["SOCIAL", "TECHNICAL"]),
  });

  const form = useForm<z.infer<typeof supporterSchema>>({
    resolver: zodResolver(supporterSchema),
    defaultValues: {
      username: "",
      role: undefined,
    },
  });
  const onSubmit = async (data: z.infer<typeof supporterSchema>) => {
    setIsCreating(true);
    const res = await createSupporter(data);
    if (res) {
      if (res.status == 201) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
    setIsCreating(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <DashboardSectionButton icon={Plus} label="Add" hover={true} 
        className="bg-white ml-10 border-slate-500 border-2"/>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete all related information.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason you apply for aids</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SOCIAL">Social</SelectItem>
                      <SelectItem value="TECHNICAL">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Create</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
