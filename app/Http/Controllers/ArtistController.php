<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\ArtField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function showRegistrationForm()
    {
        $artFields = ArtField::active()->get();
        
        return Inertia::render('Artist/Register', [
            'artFields' => $artFields
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:artists',
            'email' => 'required|string|email|max:255|unique:artists',
            'birth_date' => 'required|date',
            'password' => ['required', 'confirmed', Password::defaults()],
            'art_field_id' => 'required|exists:art_fields,id',
            'telegram_id' => 'nullable|string|max:255',
            'whatsapp_id' => 'nullable|string|max:255',
            'instagram_id' => 'nullable|string|max:255',
            'linkedin_id' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ], [
            'first_name.required' => 'نام الزامی است',
            'last_name.required' => 'نام خانوادگی الزامی است',
            'phone.required' => 'شماره تماس الزامی است',
            'phone.unique' => 'این شماره تماس قبلاً ثبت شده است',
            'email.required' => 'ایمیل الزامی است',
            'email.email' => 'فرمت ایمیل صحیح نیست',
            'email.unique' => 'این ایمیل قبلاً ثبت شده است',
            'birth_date.required' => 'تاریخ تولد الزامی است',
            'password.required' => 'رمز عبور الزامی است',
            'password.confirmed' => 'رمز عبور و تکرار آن مطابقت ندارند',
            'art_field_id.required' => 'انتخاب رشته هنری الزامی است',
            'art_field_id.exists' => 'رشته هنری انتخاب شده معتبر نیست',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $artist = Artist::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'password' => Hash::make($request->password),
            'art_field_id' => $request->art_field_id,
            'telegram_id' => $request->telegram_id,
            'whatsapp_id' => $request->whatsapp_id,
            'instagram_id' => $request->instagram_id,
            'linkedin_id' => $request->linkedin_id,
            'bio' => $request->bio,
            'is_verified' => false,
            'is_active' => true,
        ]);

        // Log in the artist
        auth()->guard('artist')->login($artist);

        return redirect()->route('artist.dashboard')->with('success', 'ثبت نام شما با موفقیت انجام شد!');
    }

    public function dashboard()
    {
        $artist = auth()->guard('artist')->user();
        $arts = $artist->arts()->latest()->get();
        
        return Inertia::render('Artist/Dashboard', [
            'artist' => $artist,
            'arts' => $arts
        ]);
    }

    public function profile()
    {
        $artist = auth()->guard('artist')->user();
        
        return Inertia::render('Artist/Profile', [
            'artist' => $artist
        ]);
    }

    public function updateProfile(Request $request)
    {
        $artist = auth()->guard('artist')->user();
        
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:artists,phone,' . $artist->id,
            'email' => 'required|string|email|max:255|unique:artists,email,' . $artist->id,
            'birth_date' => 'required|date',
            'telegram_id' => 'nullable|string|max:255',
            'whatsapp_id' => 'nullable|string|max:255',
            'instagram_id' => 'nullable|string|max:255',
            'linkedin_id' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $artist->update($request->only([
            'first_name', 'last_name', 'phone', 'email', 'birth_date',
            'telegram_id', 'whatsapp_id', 'instagram_id', 'linkedin_id', 'bio'
        ]));

        return back()->with('success', 'اطلاعات پروفایل با موفقیت بروزرسانی شد');
    }
}
