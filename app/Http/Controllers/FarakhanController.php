<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class FarakhanController extends Controller
{
    public function download()
    {
        $pdf = Pdf::loadView('farakhan', [
            'title' => 'فراخوان جشنواره بین‌المللی مسیر ایران'
        ]);

        $pdf->setPaper('a4', 'portrait');
        $pdf->setOption('isHtml5ParserEnabled', true);
        $pdf->setOption('isRemoteEnabled', true);
        $pdf->setOption('isPhpEnabled', true);
        $pdf->setOption('defaultFont', 'iransansx');
        $pdf->setOption('fontDir', public_path('fonts'));
        $pdf->setOption('fontCache', storage_path('fonts'));
        $pdf->setOption('chroot', base_path());
        $pdf->setOption('enable-local-file-access', true);
        $pdf->setOption('defaultMediaType', 'print');
        $pdf->setOption('isFontSubsettingEnabled', true);

        return $pdf->download('farakhan-jashnvare-masir-iran.pdf');
    }

    public function view()
    {
        $pdf = Pdf::loadView('farakhan', [
            'title' => 'فراخوان جشنواره بین‌المللی مسیر ایران'
        ]);

        $pdf->setPaper('a4', 'portrait');
        $pdf->setOption('isHtml5ParserEnabled', true);
        $pdf->setOption('isRemoteEnabled', true);
        $pdf->setOption('isPhpEnabled', true);
        $pdf->setOption('defaultFont', 'iransansx');
        $pdf->setOption('fontDir', public_path('fonts'));
        $pdf->setOption('fontCache', storage_path('fonts'));
        $pdf->setOption('chroot', base_path());
        $pdf->setOption('enable-local-file-access', true);
        $pdf->setOption('defaultMediaType', 'print');
        $pdf->setOption('isFontSubsettingEnabled', true);

        return $pdf->stream('farakhan-jashnvare-masir-iran.pdf');
    }
}

