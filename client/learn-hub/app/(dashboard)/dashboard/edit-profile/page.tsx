import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TextareaForm } from "./_component/editbio"

const EditProfile = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-start p-6 space-y-4">
                <h2 className="md:text-xl  font-extrabold text-gray-900 mb-2">Basic Information</h2>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                            Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="email">
                        <Card>
                        <CardHeader>
                            <CardTitle>Email</CardTitle>
                            <CardDescription>
                            Change your email here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Current email</Label>
                            <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="new">New email</Label>
                            <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save email</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="flex flex-col items-center justify-start p-6 space-y-4">
                <h2 className="md:text-xl  font-extrabold text-gray-900 mb-2">Profile View</h2>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="social">Social</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <TextareaForm />
                    </TabsContent>
                    <TabsContent value="social">
                        <Card>
                        <CardHeader>
                            <CardTitle>Social Network</CardTitle>
                            <CardDescription>
                            Change your social network here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Linkedin</Label>
                            <Input id="current" type="password" />
                            </div>
                        </CardContent>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Youtube</Label>
                            <Input id="current" type="password" />
                            </div>
                        </CardContent>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Facebook</Label>
                            <Input id="current" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default EditProfile;